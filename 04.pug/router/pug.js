// 라우터로 변환
const express = require("express");
// 라우터 객체로 불러옴
const router  = express.Router();

/**  /pug/update/4 으로 들어온다고 치면 
 * 요청처리시 app.js------------------------ 
 * const pugRouter = require('./router/pug');
 * 미들웨어등록, 좌측 링크접속 시 함수객체 돌려줌
 * app.use("/pug", pugRouter);
*/
router.get("/sample", (req, res)=>{
	res.send("라우터 테스트입니다.");
});

// 라우터등록
module.exports = router;