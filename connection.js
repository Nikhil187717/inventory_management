const mysql = require('mysql');
require('dotenv').config()

const pool = mysql.createPool({
	connectionLimit: 10,
	multipleStatements: true,
	dateStrings: true,
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASS
});

module.exports = pool;