module.exports = (sequelize, Sequelize) => {
	return sequelize.define('Board', {
		title: {
			type: Sequelize.STRING(255)
			
		},
		writer: {
			type: Sequelize.STRING(255)
		},
		img: {
			type: Sequelize.STRING(255)
		},
		comment: {
			type: Sequelize.TEXT()
		}

	}, {
		timestamps: true, // false로 들어가면 createAt, updateAt 생성 X
		charset: 'utf8',
		tableName: 'boards'
	});
}