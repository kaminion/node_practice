# Node.js 세팅
## Node.js 설치
* 아래는 코드 삽입 문이다.
	- nodejs.org에서 node 설치
	- 다운로드한 후 기본값으로 설치
	- 설치 후 터미널 실행하여 명령어 수행

~~~
	node --version
~~~

	- 프로젝트 폴더 생성, VS코드로 폴더염
	- app.js 생성 터미널 창 열어서 코드 입력

~~~bash
#한번만 설치하면 되는 모듈(global 모듈)
npm i -g supervisor
#node 개발 시 (webpack-dev서버)
npm i -g nodemon 
#배포시 사용하는 모듈(상단 두 개는 개발 시에만 사용)
npm i -g pm2


# npm 프로젝트를 설치하고, package.json을 생성해 준다.
npm init -y

#express모듈을 설치한다. (퍼그도 설치)
npm i express pug
- npm i pug 로 해도됨
~~~

 - app.js 파일을 열고 아래의 코드를 입력
~~~js

const express = require('express');
const app = express();
const port = 3000;
const host '127.0.0.1';
// node 8 const bodyParser = require('body-parser') 10 이후에는 express에 포함되어있음 (Legacy)

// 서버 리스닝 이벤트(열릴때)
app.listen(port, ()=>{
	console.log(`http://${host}:${port}`);
});

// pug view engine 세팅
app.set("view engine", "pug");
// key = value 구조 
app.set("views", "./views");

// express 세팅 및 미들웨어 세팅, 정적라우터
app.use("/", express.static("./public")); // 퍼블릭으로 포워딩 함 

// post방식으로 전송 시 body에 있는 내용을 파싱
app.use(express.json()); // body에 있는 내용을 js에서 다룰 수 있도록 json(Object)화 시켜서 받아내는 역할
app.use(express.urlencoded({extenede: false}));
// 소스 정렬해서보기
app.locals.pretty = true;

app.get("/user", (req,res) => {

	let query = req.qurey.id; // Query String (GET)

});

app.get("/user/:id", (req,res) => {

	let paramId = req.params.id; // Sementic 방식 주소줄을 통해 요청된 변수접근

});


app.post("/user", (req,res) => {

	// 파싱 하고나서만 사용 가능, post
	let bodyId = req.body.id;

});


~~~
위엔 안적었지만 pug도 내장
pacakge json에서 entry point 스크립트로 지정
npm start를 제외하곤 npm run