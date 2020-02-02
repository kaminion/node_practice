# Express + Sequelize 세팅
## 1. 최초 한번 설치
~~~~bash
npm i -g express-generator // express 명령어 사용가능
npm i -g sequelize-cli // sequelize 명령어 사용가능
~~~~

## 2. 프로젝트생성
~~~~bash
#express 프로젝트 생성
express --veiw=pug "생성폴더명"
cd 폴더명
npm i 

#sequelize / mysql2
npm i mysql2 sequelize

#sequelize 프로젝트 생성
sequelize init
~~~~

## 3. 프로젝트 마이그레이션

~~~js
# Models 폴더에 Model 생성
# models/Sample.js

module.exports = (sequelize, Sequelize) => {
	return sequelize.define('sample', {
		title: Sequelize.STRING(255),
		text: Sequelize.TEXT(),
		comment: Sequelize.TEXT()

	}, {
		timestamps: true,
		tableName: "Samples"
	})

	// app.js
	var {sequelize} = require("./models");
	sequelize.sync({force:true});

	// 라우터 등록
	// routes/sample.js
	const {파일명} = require("./models");
}

~~~

npx = 설치되지않았으면 설치까지해줌(설치되었으면 실행)


sequelize model:generate --name User --attributes