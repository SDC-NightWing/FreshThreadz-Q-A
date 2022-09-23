const mysql = require('mysql2');
require('dotenv').config()

const pool = mysql.createPool({
  host: process.env.MYSQLHOST,
  user: process.env.MYSQLUSER,
  database: process.env.MYSQLDB,
  password: process.env.MYSQLPW,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool.promise();

/*
const mysql = require('mysql2/promise');
// create the connection
const connection = async () => {
  const connection = await mysql.createConnection({ host: 'localhost', user: 'root', database: 'sdc' });
  return connection
}

module.exports = connection
*/