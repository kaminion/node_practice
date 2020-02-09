module.exports = (sequelize, Sequelize) => 
{
	return sequelize.define('Hash', {
		title: {
			type: Sequelize.STRING(255),
			allowNUll: false,
			unique: true
		}
	}, {
		charset: 'utf8'
	});
}