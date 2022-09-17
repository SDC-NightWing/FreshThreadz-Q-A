const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'sdc',
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