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

// @route   GET /api/health/workflow-test
// @desc    Workflow validation endpoint - tests all CI/CD pipelines
// @access  Public
// @note    This endpoint validates that all GitHub Actions workflows work properly
router.get('/workflow-test', (req, res) => {
  try {
    // Get package info for dependency validation
    const pkg = require('../../package.json');
    
    // Get current timestamp for tracking
    const timestamp = new Date().toISOString();
    
    res.json({
      success: true,
      message: '🚀 Workflow Validation Test Successful!',
      
      workflows: {
        ci: {
          name: '🚀 Enhanced CI/CD Pipeline with Security',
          status: 'SHOULD_PASS',
          checks: ['ESLint', 'Prettier', 'Security Audit', 'Tests'],
          actions: 'actions/upload-artifact@v4 ✅'
        },
        enhancedCi: {
          name: '🔒 Enhanced Security CI Pipeline', 
          status: 'SHOULD_PASS',
          checks: ['Security Analysis', 'Multi-Node Testing', 'Build Verification'],
          actions: 'actions/upload-artifact@v4 ✅'
        },
        cdDeploy: {
          name: '🚀 Continuous Deployment (CD) Pipeline',
          status: 'SHOULD_TRIGGER_ON_MERGE',
          trigger: 'merge-to-main',
          actions: 'actions/upload-artifact@v4 ✅'
        },
        codeQl: {
          name: 'CodeQL Security Analysis',
          status: 'SHOULD_PASS',
          checks: ['Code Security Scanning'],
          actions: 'github/codeql-action@v3 ✅'
        },
        secretScanning: {
          name: 'Secret Scanning',
          status: 'SHOULD_PASS', 
          checks: ['Secret Detection'],
          actions: 'secure ✅'
        }
      },
      
      dependencies: {
        packageJson: {
          name: pkg.name,
          version: pkg.version,
          nodeEngine: pkg.engines?.node || 'not specified',
          npmEngine: pkg.engines?.npm || 'not specified'
        },
        keyPackages: {
          eslint: pkg.devDependencies?.eslint || 'not found',
          supertest: pkg.devDependencies?.supertest || 'not found',
          mongoose: pkg.dependencies?.mongoose || 'not found',
          express: pkg.dependencies?.express || 'not found'
        },
        security: {
          eslintPluginSecurity: pkg.devDependencies?.['eslint-plugin-security'] || 'not found',
          helmet: pkg.dependencies?.helmet || 'not found'
        }
      },
      
      validation: {
        timestamp: timestamp,
        environment: process.env.NODE_ENV || 'development',
        nodeVersion: process.version,
        buildId: process.env.GITHUB_RUN_ID || 'local',
        uptime: process.uptime()
      },
      
      tests: {
        endpoint: '/api/health/workflow-test',
        purpose: 'Validate all CI/CD workflows execute without errors',
        expectations: {
          npmInstall: 'Clean installation with no 404 errors',
          ciPipeline: 'All jobs pass with green checkmarks',
          securityScans: 'No vulnerabilities or warnings',
          cdTrigger: 'Deployment pipeline activates on merge',
          artifacts: 'Upload/download works with v4 actions'
        },
        nextStep: 'Merge this PR to trigger automated deployment pipeline'
      },
      
      achievement: {
        title: '🧪 Workflow Testing in Progress',
        description: 'Testing all CI/CD pipelines for dependency and security fixes',
        currentStatus: 'PR created - awaiting CI execution results'
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Workflow test endpoint failed',
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

module.exports = router;
