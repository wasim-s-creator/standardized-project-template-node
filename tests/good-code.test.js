const { expect } = require('chai');
const goodCode = require('../src/good-code');

describe('goodCode function', () => {
  it('should return true', () => {
    expect(goodCode()).to.equal(true);
  });
});
