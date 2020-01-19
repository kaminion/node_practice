const path = require("path");
// DB내부의 속성을 받을거니..
const { sequelize, Sequelize } = require(path.join(__dirname, "../modules/sequelize-conn"));
const Model = Sequelize.Model;

// sequelize는 인스턴스, Sequelize 는 클래스

class User extends Model
{

}

User.init({
	username:{type: Sequelize.STRING},
	userid: {type: Sequelize.STRING},
	age: {type: Sequelize.INTEGER}

}, {
	sequelize,
	modelName: "user"
});

// 접속정보 sequelize 를 이용하여 명령을 실행하여라
User.sync({force: true});

module.exports = {User};