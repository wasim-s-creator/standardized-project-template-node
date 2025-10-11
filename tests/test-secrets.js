// test-secrets.js - FOR TESTING SECRET SCANNING ONLY

// ❌ These will be detected by GitHub Secret Scanning:

// Fake AWS Access Key (will be detected)
const awsAccessKey = 'AKIAIOSFODNN7EXAMPLE123';

// Fake GitHub Token (will be detected)
//const githubToken = 'ghp_abcdefghijklmnopqrstuvwxyz123456789012345678';

// Fake API Key Pattern (will be detected)
const apiKey = 'sk-1234567890abcdef1234567890abcdef12345678';

// Fake Database Connection (will be detected)
const dbUrl =
  'mongodb://admin:supersecretpassword@cluster.mongodb.net/production';

// Fake JWT Secret (might be detected)
const jwtSecret = 'jwt-secret-key-very-long-and-complex-12345678901234567890';

// Export (not actually used)
module.exports = {
  awsAccessKey,
  // githubToken,
  apiKey,
  dbUrl,
  jwtSecret,
};

console.log(
  '⚠️ This file contains FAKE secrets for testing GitHub Secret Scanning'
);
console.log(
  '🚫 DO NOT use these in production - they are intentionally exposed for demo'
);
