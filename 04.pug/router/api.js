const express = require('express');
const router = express.Router();
const { pool, sqlErr } = require("../mysql-con");


/* 

	조회
	삽입
	업데이트
	삭제


*/

// 이하 /api 생략
//모든리스트, 두번쨰는 id 존재
router.get(["/get", "/get/:id"], async (req, res) => {
	let sql = "";
	const vals = {
		title : "API 게시판"
	};
	const conn = await pool.getConnection();

	if(req.params.id){
		sql = "SELECT * FROM board WHERE id=" + req.params.id;
	}else{
		sql = "SELECT * FROM board ORDER BY id DESC";
	}

	const result = await conn.query(sql);
	vals.data = result[0];
	conn.release();
	res.json(vals);
});

router.post("/post", async (req, res) => {
	let title = req.body.title;
	let content = req.body.content;
	let writer = req.body.writer
	let wdate = new Date();

	let sql = "INSERT INTO board SET title=?, content=?, writer=?, wdate=?";
	let sqlVals = [title, content, writer, wdate];
	let conn = await pool.getConnection();
	let result = conn.query(sql, sqlVals);

	res.json(result);
	conn.release();
});

// router.put();
router.delete("/delete", async (req, res) => {

	let sql = "DELETE FROM board WHERE id=" + req.body.id;
	let connect = await pool.getConnection();
	let result = await connect.query(sql);
	
	connect.release();
	res.json(result[0]);
});

router.put("/put", async(req, res) => {
	let id = req.body.id;
	let title = req.body.title;
	let content = req.body.content;
	let writer = req.body.writer;
	let sql = "UPDATE board SET title=?, content=?, writer=? WHERE id=?";
	let sqlVals = [title, content, writer, id];

	const connect = await pool.getConnection();
	const result = await connect.query(sql, sqlVals);

	connect.release();
	res.json(result);

});

module.exports = router;