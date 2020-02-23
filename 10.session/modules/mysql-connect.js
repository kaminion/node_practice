const mysql = require('mysql2/promise');
const connect = mysql.createPool({
    host:"localhost",
    user:"node",
    password:"1234",
    database:'node',
    connectionLimit: 10,
    waitForConnections: true
});

module.exports = { connect };