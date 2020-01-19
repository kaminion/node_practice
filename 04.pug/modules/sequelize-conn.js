const Sequelize = require('sequelize');
const sequelize = new Sequelize({
	host: "localhost",
	port: 3308,
	dialect: 'mysql',
	username: "root",
	password: "1234",
	database: "node",
	pool: {
		max: 10,
		min: 0
	}
});

// (async ()=>{
// 	await sequelize.authenticate();
// 	console.log("success");

// })();

module.exports = {sequelize, Sequelize};