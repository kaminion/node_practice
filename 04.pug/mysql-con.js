const mysql = require("mysql");

const conn = mysql.createPool({
	host: 'localhost',
	user: 'root',
	password: '1234',
	port: 3308,
	database: 'node',
	connectionLimit: 10	,
});

// ES6는 default export
// 객체 속성 이름이 동일할 경우 생략가능 
module.exports = 
{
	mysql,
	conn
}

// const conn = mysql.createConnection{
// 	host: 'localhost',
// 	user: 'root',
// 	password: '1234',
// 	port: '3308',
// 	database: 'node'
// });