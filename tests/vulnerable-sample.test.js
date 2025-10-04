const { expect } = require('chai');
const sinon = require('sinon');
const { vulnerableLogin } = require('../src/vulnarable-sample');

describe('vulnerableLogin', () => {
  it('should call db.query with correct SQL for given email and password', () => {
    const db = {
      query: sinon.stub().returns([{ id: 1, email: 'test@example.com' }]),
    };
    const email = 'test@example.com';
    const password = 'password123';
    vulnerableLogin(db, email, password);
    const expectedQuery = `SELECT * FROM users WHERE email = '${email}' AND password = '${password}'`;
    expect(db.query.calledOnceWithExactly(expectedQuery)).to.be.true;
  });

  it('should return the result from db.query', () => {
    const result = [{ id: 2, email: 'user@example.com' }];
    const db = { query: sinon.stub().returns(result) };
    const output = vulnerableLogin(db, 'user@example.com', 'pass');
    expect(output).to.equal(result);
  });

  it('should be vulnerable to SQL injection (demonstration)', () => {
    const db = { query: sinon.stub().returns([]) };
    const email = "' OR 1=1 --";
    const password = 'irrelevant';
    vulnerableLogin(db, email, password);
    const expectedQuery = `SELECT * FROM users WHERE email = '${email}' AND password = '${password}'`;
    expect(db.query.calledOnceWithExactly(expectedQuery)).to.be.true;
  });
});
