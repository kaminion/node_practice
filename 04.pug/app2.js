const express = require('express');
const methodOverride = require('method-override');
const path = require('path');
const app = express();
const port = 3000;
const host = '127.0.0.1';
const axios = require("axios");
const User = require(path.join(__dirname, "./models/User"));

// 아래 라우터있음
app.listen(port, ()=>{
	console.log(`http://${host}:${port}`);
});

app.set("view engine", "pug");
app.set("views", "./views");

app.use("/", express.static("./public"));
app.use("/public/css", express.static(path.join(__dirname, "./public/css"))); 
app.use('/uploads', express.static(path.join(__dirname, './uploads')));


app.use(express.json()); 
// 계층구조를 통신으로 받으면 true
app.use(express.urlencoded({extenede: false}));

// AJAX에서는 불필요하다 methodOVerride
// app.use(methodOverride(function (req, res) {
// 	if (req.body && typeof req.body === 'object' && '_method' in req.body) {
// 	  // look in urlencoded POST bodies and delete it
// 	  var method = req.body._method
// 	  delete req.body._method
// 	  return method
// 	}
//   }))

app.locals.pretty = true;
//라우터 가져오기
const pugRouter = require(path.join(__dirname, "./router/pug"));
// 라우터 연결 미들웨어 거쳐야함 express josn이나 urlencoded..
app.use("/pug", pugRouter);

// api 라우터 연결
const apiRouter = require(path.join(__dirname, "./router/api"));
app.use("/api", apiRouter);


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


