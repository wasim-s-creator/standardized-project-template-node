const { expect } = require('chai');
const { SECRET_KEY, signJwt } = require('../src/secret-leak');

describe('secret-leak', () => {
  it('should export a realistic hardcoded secret', () => {
    expect(SECRET_KEY).to.be.a('string');
    expect(SECRET_KEY).to.match(/^sk_live_/);
  });

  it('should use the secret in signJwt', () => {
    const payload = { user: 'alice' };
    const signed = signJwt(payload);
    expect(signed).to.include(SECRET_KEY);
    expect(signed).to.include('signed');
  });
});
