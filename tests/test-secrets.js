// test-secrets.js - Intentional dummy secrets for GitHub secret scanning test

const awsAccessKey = 'AKIA1234567890ABCDEF'; // 16 uppercase letters/numbers after AKIA
const awsSecretKey = 'wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY'; // 40 chars
const githubToken = 'ghp_1234567890abcdef1234567890abcdef1234'; // 36 chars after ghp_
//const apiKey = 'sk-abcdefghijklmnopqrstuvwxyz123456789012345678'; // 40 alphanumeric chars after sk-
const dbUrl = 'mongodb://admin:supersecretpassword@localhost:27017/mydb'; // matches test
const jwtSecret = 'jwt-secret-key-very-long-and-secure'; // >20 chars, contains 'jwt-secret-key'

module.exports = {
  awsAccessKey,
  awsSecretKey,
  githubToken,
  //apiKey,
  dbUrl,
  jwtSecret,
};
