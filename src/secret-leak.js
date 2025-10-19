// src/secret-leak.js
const jwtSecret = 'supersecretkey123'; // Hardcoded secret
const SECRET_KEY = 'sk_live_1234567890abcdef'; // Hardcoded secret key (looks like a real API key)

function signJwt(payload) {
  // Simulate using the secret in a sensitive context
  return `signed(${JSON.stringify(payload)})with(${SECRET_KEY})`;
}

module.exports = { SECRET_KEY, signJwt };

//
