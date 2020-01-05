const express = require('express');
const app = express();
const port = 3000;
const host = '127.0.0.1';
const axios = require("axios");
// 비구조할당문법
const {mysql, conn} = require("./mysql-con");


app.listen(port, ()=>{
	console.log(`http://${host}:${port}`);
});

app.set("view engine", "pug");
app.set("views", "./views");

app.use("/", express.static("./public"));
app.use("/public/css", express.static("./public/css")); 

app.use(express.json()); 
app.use(express.urlencoded({extenede: false}));

app.locals.pretty = true;

app.get(["/pug", "/pug/:page"], (req, res) => {
	let page = req.params.page ? req.params.page : "list";

	let vals = {};
	let filename = "";

	switch(page)
	{
		case "list": 
			vals.title = "게시글 리스트 입니다.";
			vals.small = "게시판 리스트";
			vals.lists = [{
				id:1, title: "첫번째 글", writer: "관리자",
				wdate: "2020-01-03", rnum: 5
			},
			{
				id:2, title: "두번째 글", writer: "관리자",
				wdate: "2020-01-04", rnum: 6
			},
			{
				id:3, title: "세번째 글", writer: "관리자",
				wdate: "2020-01-05", rnum: 4
			}];
			filename = "list.pug";
		break;
		case "write": 
			vals.title = "게시글 작성입니다.";
			vals.small = "게시글 작성";
			filename = "write.pug";
		break;
		default:
			res.redirect("/");
			break;
	}

	res.render(filename, vals);
}); // END OF PUG

app.get("/sqltest", (req, res) => {
	let connection = conn.getConnection((err, connect)=>{
		if(err) res.send("DB 접속실패");

		let sql = "INSERT INTO BOARD SET title='테스트입니다.', writer='관리자', wdate='2020-01-06' ";
		connect.query(sql, (err, result) => {
			if(err) res.send("쿼리 실패");
			res.json(result);
	
		});
		
	});
});
