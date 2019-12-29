const express = require('express');
const app = express();
const host = "127.0.0.1";
const port = 3000;
const bodyParser = require('body-parser'); // Middleware

// 미들웨어 사용 시 use 사용 POST데이터를 알아서 파싱해줌
app.use(bodyParser.json()); // 클라이언트 json 파싱 
app.use(bodyParser.urlencoded({extended: false})); // 포스트 방식으로 넘어온 데이터를 enctype multipart 안쓰겠다
// 정적 폴더 지정, 클라이언트가 접근 가능함
app.use("/", express.static("./public/"));



app.listen(port, host, () => {
	console.log(`http://${host}:${port}`);
});

// app.get("/", (req,res) => {
// 	res.send("<h1>Hello World</h1>");
// });

app.get("/hello", (req, res) => {
	res.redirect("/home");
})

app.get("/home", (req, res) => {
	let user = req.query.name;
	let param = req.param("man");
	res.send(`${user} : ${param}`);
});

app.get("/api/user", (req, res) =>{
	let users = {
		users: [
			{id: 1, name: "홍길동", age: 25},
			{id: 2, name: "홍길만", age: 29},
			{id: 3, name: "홍길용", age: 28}
		],
		cnt: 3
	};

	res.json(users);
});

app.get("/blog/:category/:id", (req, res) => {

	let category = req.params.category;
	let id = req.params.id;
	res.send(`${category} : ${id} 입니다.`);

});

app.post("/join", (req, res) => {
	let userid = req.body.userId;
	let userpw = req.body.password;

	res.send(`${userid} : ${userpw}`);
});


