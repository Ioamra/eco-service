const express = require('express')
const mysql = require('mysql')
const dotenv = require('dotenv').config();
const port = 5000

const app = express()

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "test",
});

app.get('/api', (req, res) => {
    res.json({"test": "test"})
})

app.listen(5000, () => {
    console.log(`Backend started on port ${port}`)
})