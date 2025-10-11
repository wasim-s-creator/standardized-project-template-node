const { expect } = require('chai');
const secrets = require('./test-secrets');

describe('test-secrets', () => {
  it('should export a fake AWS Access Key', () => {
    expect(secrets.awsAccessKey).to.match(/^AKIA[0-9A-Z]{16,}$/);
  });

  it('should export a fake GitHub Token', () => {
    // expect(secrets.githubToken).to.match(/^ghp_[a-zA-Z0-9]{36}$/);
  });

  it('should export a fake API Key', () => {
    expect(secrets.apiKey).to.match(/^sk-[a-zA-Z0-9]{40}$/);
  });

  it('should export a fake DB URL', () => {
    expect(secrets.dbUrl).to.include('mongodb://admin:supersecretpassword@');
  });

  it('should export a fake JWT Secret', () => {
    expect(secrets.jwtSecret)
      .to.be.a('string')
      .and.to.include('jwt-secret-key');
    expect(secrets.jwtSecret.length).to.be.greaterThan(20);
  });
});
