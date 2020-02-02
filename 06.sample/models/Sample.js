module.exports = (sequelize, Sequelize) => {
	return sequelize.define('sample', {
		title: Sequelize.STRING(255),
		text: Sequelize.TEXT(),
		comment: Sequelize.TEXT()

	}, {
		timestamps: true,
		tableName: "Samples"
	})
}