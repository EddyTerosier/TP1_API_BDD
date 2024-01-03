const mysql2 = require('mysql2/promise');
require('dotenv').config();

const pool = mysql2.createPool({
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
});

module.exports = pool


