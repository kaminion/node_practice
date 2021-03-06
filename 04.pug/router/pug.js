// 라우터로 변환
const express = require("express");
// 라우터 객체로 불러옴
const router  = express.Router();
const datetime = require("date-time");
// 비구조할당문법
const {pool, sqlErr} = require("../modules/mysql-con");
const path = require('path');
const { storage } = require(path.join(__dirname, '../modules/multer-conn'));



/**  /pug/update/4 으로 들어온다고 치면 
 * 요청처리시 app.js------------------------ 
 * const pugRouter = require('./router/pug');
 * 미들웨어등록, 좌측 링크접속 시 함수객체 돌려줌
 * app.use("/pug", pugRouter);
*/
router.get(["/", "/:page"], async (req, res) => {
	let page = req.params.page ? req.params.page : "list";
	// 상수
	// console.log(__dirname);
	let vals = {};
	let filename = "";
	let sql = "";
	// console.log(req.ip);

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
			sql = "SELECT * FROM board ORDER BY id DESC";
			const conn = await pool.getConnection();
			const result = await conn.query(sql);
			
			// 객체는 참조형이라 그런가?
			for(let v of result[0])
			{
				// ==="" 과 null을 같이 처리하는 방법
				if(v.realfile) v.fileIcon = true; 
			}
			resultData = result[0].map((v)=>{
				v.wdate = datetime({date:v.wdate});
				return v; 
			})
			vals.lists = resultData;
			
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
			let rnumUpdateSQL = "UPDATE board SET rnum = rnum + 1 WHERE id=?";
			vals.title = "게시글 상세보기입니다.";
			vals.small = "게시글 상세보기";
			filename = "view.pug";
			sql = "SELECT * FROM board WHERE id=?";
			let sqlVals = [req.query.id];
			const viewCon = await pool.getConnection();
			const viewResu = await viewCon.query(sql, sqlVals);
			const rnumQuery = await viewCon.query(rnumUpdateSQL, sqlVals);

			vals.lists = viewResu[0][0];
			let regEx = new RegExp(".jpe?g");
			let ext = path.extname(vals.lists.orifile).toLowerCase();
			if(vals.lists.realfile)
			{
				let file = vals.lists.realfile.split("-");
				vals.href = "/uploads/" + file[0] + "/" + vals.lists.realfile;

				// 확장자 체크
				if(regEx.test(ext)) vals.fileChk = "img";
				else{
					vals.fileChk = "file";
					vals.href = vals.href.replace("uploads", "downloads");
				}
			
			}else {
				vals.fileChk = "";
			}
			viewCon.release();
			break;

		default:
			res.redirect("/pug");
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


// sql val 부분 참고 물음표에 따라 동적으로 정해 줄 수 있다.
router.post("/create", storage.single("upfile"), async (req, res)=>{

	let oriFile = '';
	let realFile = '';
	let destination = '';
	// multer-conn에서 지정해줬던 것 사용가능, 서버에서 예외처리
	if(req.file)
	{
		oriFile = req.file.originalname;
		realFile = req.file.filename;
	}
	
	// filename의 경우 미들웨어를 거쳐 정제된 파일이름
	let sql = "INSERT INTO board SET title=?, writer=?, wdate=?, content=?, orifile=?, realfile=?";
	let val = [req.body.title, req.body.writer, new Date(), req.body.content, oriFile, realFile];
	const connect = await pool.getConnection();
	const result = await connect.query(sql, val);
	connect.release();
	
	res.redirect("/pug");
})

// 위에 view도 이런식으로 분리하면 좋지않을까?
router.get("/delete/:id", async (req, res) => {
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

router.get("/update/:id", async (req, res) => {
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

router.post("/update", async (req, res) =>{
	
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

// 다운로드 구현

router.get("/downloads/:id", async (req, res) => {
	let id = req.params.id;
	let sql = "SELECT realfile, orifile FROM board WHERE id="+id;

	const connect = await pool.getConnection();
	const result = await connect.query(sql);

	let filepath = path.join(__dirname, "../uploads/" + result[0][0].realfile.split("-")[0]);
	let file = filepath + "/" + result[0][0].realfile;
	res.download(file, result[0][0].orifile);

});


// 라우터등록
module.exports = router;