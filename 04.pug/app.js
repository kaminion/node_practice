const express = require('express');
const app = express();
const port = 3000;
const host = '127.0.0.1';
const axios = require("axios");
// 비구조할당문법
const {pool, sqlErr} = require("./modules/mysql-con");
// 라우터 작동
const pugRouter = require("./router/pug");
app.use("/router", pugRouter);

// 미들웨어 라우터 

app.listen(port, ()=>{
	console.log(`http://${host}:${port}`);
});

app.set("view engine", "pug");
app.set("views", "./views");

app.use("/", express.static("./public"));
app.use("/public/css", express.static("./public/css")); 
app.use('/uploads', express.static('./uploads'));

app.use(express.json()); 
// 계층구조를 통신으로 받으면 true
app.use(express.urlencoded({extenede: false}));

app.locals.pretty = true;

app.get(["/pug", "/pug/:page"], async (req, res) => {
	let page = req.params.page ? req.params.page : "list";

	let vals = {};
	let filename = "";
	let sql = "";

	switch(page)
	{
		case "list": 
			vals.title = "게시글 리스트 입니다.";
			vals.small = "게시판 리스트";
			// vals.lists = [{
			// 	id:1, title: "첫번째 글", writer: "관리자",
			// 	wdate: "2020-01-03", rnum: 5
			// },
			// {
			// 	id:2, title: "두번째 글", writer: "관리자",
			// 	wdate: "2020-01-04", rnum: 6
			// },
			// {
			// 	id:3, title: "세번째 글", writer: "관리자",
			// 	wdate: "2020-01-05", rnum: 4
			// }];
			sql = "SELECT id, title, writer, wdate, rnum, content FROM board ORDER BY id DESC";
			const conn = await pool.getConnection();
			const result = await conn.query(sql);
			vals.lists = result[0];
			filename = "list.pug";
			conn.release();
			break;

		case "write": 
			vals.title = "게시글 작성입니다.";
			vals.small = "게시글 작성";
			filename = "write.pug";
			break;
		
		// 나중에 여기 너무 많은 로직이 들어가있어서 차라리 분리해주는게 나을 수도 있다.
		case "view":
			vals.title = "게시글 상세보기입니다.";
			vals.small = "게시글 상세보기";
			filename = "view.pug";
			sql = "SELECT id, writer, title, wdate, content FROM board WHERE id=?";
			let sqlVals = [req.query.id];
			const viewCon = await pool.getConnection();
			const viewResu = await viewCon.query(sql, sqlVals);

			vals.lists = viewResu[0][0];
			viewCon.release();
			break;

		default:
			res.redirect("/");
			break;
	}

	res.render(filename, vals);
}); // END OF PUG

// callback hell 일반 mysql 모듈
// app.get("/sqltest", (req, res) => {
// 	let connection = conn.getConnection((err, connect)=>{
// 		if(err) res.send("DB 접속실패");

// 		let sql = "INSERT INTO BOARD SET title='테스트입니다.', writer='관리자', wdate='2020-01-06' ";
// 		connect.query(sql, (err, result) => {
// 			if(err) res.send("쿼리 실패");
// 			res.json(result);
	
// 		});
		
// 	});
// });

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

// sql val 부분 참고 물음표에 따라 동적으로 정해 줄 수 있다.
app.post("/board", async (req, res)=>{
	let sql = "INSERT INTO board SET title=?, writer=?, wdate=?, content=?";
	let val = [req.body.title, req.body.writer, new Date(), req.body.content];
	const connect = await pool.getConnection();
	const result = await connect.query(sql, val);
	connect.release();
	res.redirect("/pug");
})

// 위에 view도 이런식으로 분리하면 좋지않을까?
app.get("/pug/delete/:id", async (req, res) => {
	let id = req.params.id;
	let sql = "DELETE FROM board WHERE id=?";
	let vals = [id];

	const connect = await pool.getConnection();
	const result = await connect.query(sql, vals);

	// JSON으로 넘어오는 affectedRows의 여부에 따라 성공/실패가 갈림, 0개면 지워진게 없는 것

	if(result[0].affectedRows > 0) res.redirect("/pug");
	else{
		res.send("삭제에 실패하였습니다.");
	}
	connect.release();
	
})

app.get("/pug/update/:id", async (req, res) => {
	const id = req.params.id;
	const vals = {
		title: "게시글 수정"
	};
	const sql = "SELECT * FROM board WHERE id=" + id;
	
	const connect = await pool.getConnection();
	const result  = await connect.query(sql);

	vals.lists = result[0][0];
	connect.release();

	res.render("update.pug", vals);
});

app.post("/pug/update", async (req, res) =>{

	const id = req.body.id;
	const content = req.body.content;
	const title = req.body.title;

	const vals = [
		title,
		content,
		id
	];

	const sql = "UPDATE board SET title=?, content=? WHERE id=?";

	const conn = await pool.getConnection();
	const result = await conn.query(sql, vals);

	conn.release();

	if(result[0].changedRows != 0)
	{
		res.redirect("/pug");
	}else{
		res.send("수정에 실패하였습니다.");
	}

});