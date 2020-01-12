const express = require('express');
const app = express();
const port = 3000;
const host = '127.0.0.1';
const axios = require("axios");

//라우터 가져오기
const pugRouter = require("./router/pug");
// 라우터 연결
app.use("/pug", pugRouter);

app.listen(port, ()=>{
	console.log(`http://${host}:${port}`);
});

app.set("view engine", "pug");
app.set("views", "./views");

app.use("/", express.static("./public"));
app.use("/public/css", express.static("./public/css")); 

app.use(express.json()); 
// 계층구조를 통신으로 받으면 true
app.use(express.urlencoded({extenede: false}));

app.locals.pretty = true;

// mysql-2 promise pattern
app.get("/sqltest", async (req, res) => {
	
	// 모건 같은 모듈에서 에러처리할 것
	let sql = "INSERT INTO BOARD SET title=?, writer=?, wdate=? ";
	let sqlVals = ["제목입니다2", "관리자2", new Date()];
	try {
		const connect = await pool.getConnection();
		const result = await connect.query(sql, sqlVals);
		connect.release();
		res.json(result);
	} catch (err) {
		sqlErr(err);
	}
	
});
