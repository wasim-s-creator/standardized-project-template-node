// Ensure tests run in test environment
process.env.NODE_ENV = process.env.NODE_ENV || 'test';

const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');
const logger = require('../src/utils/logger');

let mongoServer;

before(async function () {
  this.timeout(20000);

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

  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  process.env.MONGODB_URI = uri;

  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    logger.info('Connected to in-memory MongoDB for tests');
  } catch (err) {
    logger.error('Failed to connect to in-memory MongoDB', err);
    throw err;
  }
});

after(async () => {
  try {
    await mongoose.disconnect();
  } catch (err) {
    logger.error('Error disconnecting mongoose after tests', err);
  }

  if (mongoServer) {
    await mongoServer.stop();
  }
  logger.info('Disconnected in-memory MongoDB');
});
