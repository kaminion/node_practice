const path = require("path");
// DB내부의 속성을 받을거니..
const { sequelize, Sequelize } = require(path.join(__dirname, "../modules/sequelize-conn"));
const Model = Sequelize.Model;
// define 사용해도됨, 클래스 사용안하면
class User extends Model
{

}
// sequelize는 인스턴스, Sequelize 는 클래스

// 여기서 sequelize.authenticate(); 해줘야함, promise모델이라 .then(()=>{}) 사용가능
// 이게 귀찮아서 conn에 async await에 써준거임
sequelize.authenticate().then(() => {

	
	User.init({
		username:{type: Sequelize.STRING},
		userid: {type: Sequelize.STRING},
		age: {type: Sequelize.INTEGER}

	}, {
		sequelize,
		modelName: "user"
	});

	// 접속정보 sequelize 를 이용하여 명령을 실행하여라
	User.sync({force: false});

});

module.exports = User;