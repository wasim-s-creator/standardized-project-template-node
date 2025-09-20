const express = require('express');
const mongoose = require('mongoose');
const os = require('os');

const router = express.Router();

// @route   GET /api/health
// @desc    Basic health check
// @access  Public
router.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'API is running',
    timestamp: new Date().toISOString(),
    status: 'healthy'
  });
});

// @route   GET /api/health/detailed
// @desc    Detailed health check with system info
// @access  Public
router.get('/detailed', async (req, res) => {
  try {
    // Check database connection
    const dbStatus = mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';
    
    // System information
    const systemInfo = {
      platform: os.platform(),
      arch: os.arch(),
      nodeVersion: process.version,
      uptime: process.uptime(),
      memory: {
        total: os.totalmem(),
        free: os.freemem(),
        used: process.memoryUsage()
      },
      loadAverage: os.loadavg()
    };

    res.json({
      success: true,
      status: 'healthy',
      timestamp: new Date().toISOString(),
      services: {
        api: 'running',
        database: dbStatus
      },
      system: systemInfo,
      environment: process.env.NODE_ENV || 'development'
    });

  } catch (error) {
    res.status(503).json({
      success: false,
      status: 'unhealthy',
      timestamp: new Date().toISOString(),
      error: error.message
    });
  }
});

// @route   GET /api/health/db
// @desc    Database connectivity check
// @access  Public
router.get('/db', async (req, res) => {
  try {
    const dbState = mongoose.connection.readyState;
    const states = {
      0: 'disconnected',
      1: 'connected',
      2: 'connecting',
      3: 'disconnecting'
    };

    if (dbState === 1) {
      // Perform a simple query to test database
      await mongoose.connection.db.admin().ping();
      
      res.json({
        success: true,
        database: {
          status: states[dbState],
          host: mongoose.connection.host,
          name: mongoose.connection.name,
          port: mongoose.connection.port
        },
        timestamp: new Date().toISOString()
      });
    } else {
      res.status(503).json({
        success: false,
        database: {
          status: states[dbState]
        },
        timestamp: new Date().toISOString()
      });
    }

  } catch (error) {
    res.status(503).json({
      success: false,
      database: {
        status: 'error',
        error: error.message
      },
      timestamp: new Date().toISOString()
    });
  }
});

module.exports = router;
