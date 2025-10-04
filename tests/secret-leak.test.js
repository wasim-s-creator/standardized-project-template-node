const { expect } = require('chai');
const { jwtSecret } = require('../src/secret-leak');

describe('secret-leak', () => {
  it('should export a hardcoded secret', () => {
    expect(jwtSecret).to.be.a('string');
    expect(jwtSecret).to.equal('supersecretkey123');
  });

  it('should not be empty', () => {
    expect(jwtSecret.length).to.be.greaterThan(0);
  });
});
