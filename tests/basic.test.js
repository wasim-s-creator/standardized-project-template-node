const { expect } = require('chai');

describe('Basic Template Tests', () => {
  it('should pass a basic test', () => {
    expect(true).to.be.true;
  });

  it('should have Node.js environment', () => {
    expect(process.version).to.match(/^v\d+\.\d+\.\d+/);
  });

  it('should load package.json successfully', () => {
    const pkg = require('../package.json');
    expect(pkg).to.have.property('name');
    expect(pkg).to.have.property('version');
    expect(pkg.name).to.equal('standardized-nodejs-template');
  });

  it('should have required environment variables structure', () => {
    // Test that we can read from .env.example
    const fs = require('fs');
    const path = require('path');
    
    const envExamplePath = path.join(__dirname, '..', '.env.example');
    expect(fs.existsSync(envExamplePath)).to.be.true;
    
    const envContent = fs.readFileSync(envExamplePath, 'utf8');
    expect(envContent).to.include('PORT=');
    expect(envContent).to.include('MONGODB_URI=');
    expect(envContent).to.include('JWT_SECRET=');
  });

  it('should validate core application structure', () => {
    const fs = require('fs');
    const path = require('path');
    
    // Check main application file exists
    const serverPath = path.join(__dirname, '..', 'src', 'server.js');
    expect(fs.existsSync(serverPath)).to.be.true;
    
    // Check models directory
    const modelsPath = path.join(__dirname, '..', 'src', 'models');
    expect(fs.existsSync(modelsPath)).to.be.true;
    
    // Check controllers directory
    const controllersPath = path.join(__dirname, '..', 'src', 'controllers');
    expect(fs.existsSync(controllersPath)).to.be.true;
    
    // Check routes directory
    const routesPath = path.join(__dirname, '..', 'src', 'routes');
    expect(fs.existsSync(routesPath)).to.be.true;
  });
});