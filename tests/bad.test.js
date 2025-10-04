const { expect } = require('chai');
const badExample = require('../src/bad');

describe('badExample function', () => {
  it('should return a value when badParam is true', () => {
    const result = badExample(true);
    expect(result).to.equal('No semicolons and inconsistent indent');
  });

  it('should return badVar when badParam is false', () => {
    const result = badExample(false);
    expect(result).to.equal(1);
  });
});
