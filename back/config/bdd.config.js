const mysql = require('mysql');
const dotenv = require('dotenv').config();

const bdd = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "eco-service",
});

module.exports = bdd;