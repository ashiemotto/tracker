// dependaces 
const mysql = require('mysql');
const inquirer = require('inquirer');
const cTable = require('console.table');

const connection = mysql.createConnection({
    // Port
    host:3001,
    // database username
    user: process.env.DB_USER,
    // database password
    password: process.env.DB_PASSWORD,
    // database name
    database: process.env.DB_NAME,
});



