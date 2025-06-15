const express = require("express");
const mysql = require("mysql");
const fs = require("fs");
const os = require("os");
const child_process = require("child_process");
const crypto = require("crypto");
const app = express();
app.use(express.json());

const db = mysql.createConnection({ host: "localhost", user: "root", password: "", database: "test" });

// 1. SQL Injection
app.get("/user", (req, res) => {
  const userId = req.query.id;
  const query = `SELECT * FROM users WHERE id = '${userId}'`; // ❌ SQL Injection
  db.query(query, (err, results) => res.json(results));
});

// 2. Command Injection
app.get("/ping", (req, res) => {
  const ip = req.query.ip;
  child_process.exec(`ping -c 1 ${ip}`, (err, stdout) => res.send(stdout)); // ❌ Command Injection
});

// 3. Insecure Eval
app.post("/calc", (req, res) => {
  const code = req.body.expr;
  const result = eval(code); // ❌ Code Injection
  res.send(`Result: ${result}`);
});

// 4. Hardcoded Secret
const SECRET_KEY = "sk_test_51H1234567890abcdef"; // ❌ Secret in code

// 5. Insecure Deserialization
app.post("/deserialize", (req, res) => {
  const data = Buffer.from(req.body.payload, "base64").toString();
  const obj = eval(`(${data})`); // ❌ Dangerous: using eval to parse serialized data
  res.send(obj);
});

// 6. Path Traversal
app.get("/read", (req, res) => {
  const filename = req.query.file;
  const path = `./data/${filename}`;
  fs.readFile(path, "utf8", (err, content) => res.send(content)); // ❌ Path Traversal
});

// 7. Insecure Randomness
app.get("/generate-token", (req, res) => {
  const token = Math.random().toString(36).substring(2); // ❌ Not cryptographically secure
  res.send(token);
});

// 8. XSS (Reflected)
app.get("/greet", (req, res) => {
  const name = req.query.name;
  res.send(`<h1>Hello, ${name}</h1>`); // ❌ Reflected XSS
});

// 9. Insecure Redirect
app.get("/redirect", (req, res) => {
  const target = req.query.url;
  res.redirect(target); // ❌ Open Redirect
});

// 10. Missing Rate Limiting (brute-force example)
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  db.query(
    `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`, // ❌ SQL Injection + no throttling
    (err, results) => {
      if (results.length > 0) res.send("Logged in!");
      else res.status(401).send("Invalid credentials");
    }
  );
});

app.listen(3000, () => {
  console.log("Vulnerable app running on http://localhost:3000");
});
