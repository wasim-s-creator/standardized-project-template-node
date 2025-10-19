// Ensure tests run in test environment
process.env.NODE_ENV = process.env.NODE_ENV || 'test';

const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');
const logger = require('../src/utils/logger');

let mongoServer;

before(async function () {
  // Increase timeout for starting/stopping DB in slower CI environments
  this.timeout(60000);
  // If there's already an active connection, disconnect it first to avoid
  // "openUri on an active connection" errors when switching URIs.
  if (mongoose.connection && mongoose.connection.readyState !== 0) {
    try {
      await mongoose.disconnect();
      logger.warn('Disconnected existing mongoose connection before tests');
    } catch (err) {
      logger.error('Error disconnecting existing mongoose connection', err);
    }
  }
  // If CI or the environment has requested using a system MongoDB, skip the
  // in-memory server and connect directly to process.env.MONGODB_URI. This
  // avoids native dependency issues (libcrypto etc.) when running in CI.
  if (String(process.env.USE_SYSTEM_MONGO).toLowerCase() === 'true') {
    const uri =
      process.env.MONGODB_URI ||
      'mongodb://localhost:27017/nodejs_template_test';
    try {
      await mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      logger.info(`Connected to system MongoDB at ${uri}`);
      return;
    } catch (sysErr) {
      logger.error('Failed to connect to system MongoDB', sysErr);
      throw sysErr;
    }
  }

  try {
    // Try to start an in-memory MongoDB instance (fast and isolated)
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    process.env.MONGODB_URI = uri;

    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    logger.info('Connected to in-memory MongoDB for tests');
  } catch (err) {
    // If in-memory Mongo fails (common on some CI images due to missing native libs),
    // fallback to any provided MONGODB_URI (for example the GitHub Actions service).
    logger.warn(
      'Starting the MongoMemoryServer Instance failed, falling back to MONGODB_URI if available',
      err
    );

    const fallbackUri =
      process.env.MONGODB_URI ||
      'mongodb://localhost:27017/nodejs_template_test';
    try {
      await mongoose.connect(fallbackUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      logger.info(`Connected to fallback MongoDB at ${fallbackUri}`);
    } catch (fallbackErr) {
      logger.error('Failed to connect to fallback MongoDB', fallbackErr);
      // If fallback also fails, rethrow the original error so tests fail loudly
      throw err;
    }
  }
});

after(async function () {
  // Allow more time for graceful shutdown in CI
  this.timeout(30000);
  try {
    await mongoose.disconnect();
  } catch (err) {
    logger.error('Error disconnecting mongoose after tests', err);
  }

  if (mongoServer) {
    try {
      await mongoServer.stop();
    } catch (err) {
      logger.error('Error stopping in-memory MongoDB instance', err);
    }
  }
  logger.info('Disconnected in-memory MongoDB');
});
