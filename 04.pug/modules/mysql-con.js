// const mysql = require("mysql");

// const conn = mysql.createPool({
// 	host: 'localhost',
// 	user: 'root',
// 	password: '1234',
// 	port: 3308,
// 	database: 'node',
// 	connectionLimit: 10	,
// });

// ES6는 default export
// 객체 속성 이름이 동일할 경우 생략가능 
// module.exports = 
// {
// 	mysql,
// 	conn
// }

// 위에껀 풀방식
// const conn = mysql.createConnection{
// 	host: 'localhost',
// 	user: 'root',
// 	password: '1234',
// 	port: '3308',
// 	database: 'node'
// });

const mysql = require('mysql2/promise');
const pool = mysql.createPool({
	host: 'localhost',
	user: 'root',
	password: '1234',
	port: 3308,
	database: 'node',
	connectionLimit: 10	,
});
// 나중에 미들웨어로 빼서 처리할 것 (filter)
const sqlErr = (err) =>
{
	console.log(err);
}

module.exports = 
{
	pool, sqlErr
}