// index.js 가 assosicate할때 인자를 넣어줌. associate 동시에 테이블을 만듬
module.exports = (sequelize, Sequelize) => {

	return sequelize.define('Member', {
		username: {
			type: Sequelize.STRING(255)
		},
		userpw: {
			type: Sequelize.STRING(16)
		},
		email:{
			type: Sequelize. STRING(255),
			unique: true
		}
	}, {
		charset: 'utf8'
	});
};