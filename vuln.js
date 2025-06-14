// WARNING: This file contains intentionally vulnerable JavaScript code
// for educational and testing purposes only. DO NOT USE IN PRODUCTION.

// === 1. Cross-Site Scripting (XSS) ===
function displayUserInput() {
  const userInput = location.hash.substring(1); // e.g. #<script>alert(1)</script>
  document.getElementById('output').innerHTML = "You said: " + userInput; // XSS
}
displayUserInput();

// === 2. Insecure eval() usage ===
function runUserCode(code) {
  // Dangerous: executes arbitrary code
  eval(code); // e.g. code = "alert('Hacked!')"
}
runUserCode(prompt("Enter your JS code:"));

// === 3. SQL Injection (Node.js example) ===
const express = require('express');
const mysql = require('mysql');
const app = express();

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'testdb'
});

app.get('/user', (req, res) => {
  const username = req.query.username; // e.g. ' OR '1'='1
  const query = `SELECT * FROM users WHERE username = '${username}'`;
  connection.query(query, (error, results) => {
    if (error) throw error;
    res.send(results);
  });
});

app.listen(3000, () => console.log('Server running on port 3000'));

// === 4. Insecure DOM manipulation ===
function updatePageContent(content) {
  document.getElementById('page').innerHTML = content; // vulnerable to XSS
}
updatePageContent('<img src=x onerror=alert(2)>');

// === SQL Injection Example (Node.js + MySQL) ===
const express = require('express');
const mysql = require('mysql');
const app = express();

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'supersecret',
  database: 'testdb'
});

app.get('/login', (req, res) => {
  const username = req.query.username;
  const password = req.query.password;

  // ❌ Vulnerable to SQL Injection (do NOT do this in production)
  const query = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`;

  console.log('Running query:', query);

  connection.query(query, (error, results) => {
    if (error) {
      console.error('Query error:', error);
      res.status(500).send('Server error');
      return;
    }

    if (results.length > 0) {
      res.send('Login successful!');
    } else {
      res.send('Invalid credentials');
    }
  });
});

app.listen(3001, () => console.log('App listening on port 3001'));
