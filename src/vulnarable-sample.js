// src/vulnerable-sample.js

function vulnerableLogin(db, email, password) {
  // Unsafe string concatenation vulnerable to SQL injection
  const query = `SELECT * FROM users WHERE email = '${email}' AND password = '${password}'`;
  return db.query(query);
}

module.exports = { vulnerableLogin };
