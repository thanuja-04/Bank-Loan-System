// db.js
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('bank.db');

// Create tables if not exist
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS loans (
    loan_id INTEGER PRIMARY KEY AUTOINCREMENT,
    customer_id TEXT,
    principal REAL,
    years INTEGER,
    rate REAL,
    interest REAL,
    total_amount REAL,
    monthly_emi REAL,
    amount_paid REAL DEFAULT 0
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS transactions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    loan_id INTEGER,
    type TEXT,
    amount REAL,
    date TEXT DEFAULT CURRENT_TIMESTAMP
  )`);
});

module.exports = db;
