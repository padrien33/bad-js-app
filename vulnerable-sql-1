const express = require("express");
const mysql = require("mysql");
const app = express();
const db = mysql.createConnection({ host: "localhost", user: "root", password: "", database: "test" });

app.get("/login", (req, res) => {
  const user = req.query.user;
  const query = `SELECT * FROM users WHERE username = '${user}'`; // ❌ vulnerable
  db.query(query, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

