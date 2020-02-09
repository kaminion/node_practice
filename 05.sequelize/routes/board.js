var express = require("express");
var router = express.Router();
var {Board, Member} = require("../models");
var dateTime = require("date-time");

router.get(["/", "/:id"], async function(req, res, next){

	let data;

	try{
		if(req.params.id){
			req.params.id === "writer" ? res.render("board-write.pug") : ""; 

			data = await Board.findOne({
				where:{
					id:req.params.id
				},
				raw:true
			});
			res.json(data);
			return;
		}

		data = await Board.findAll({
			order: [["id", "desc"]],
			raw: true
		}); // 옵션 줘야함
		
		
		for(var v of data)
		{
			v.createdAt = dateTime({date: v.createdAt});
		}
		let datas = data;
	// // map은 비동기 
	//  	let datas = await data.map(dataEl => {
	// 		dataEl.createdAt = dateTime({date: dataEl.createdAt});
	// 		console.log(dataEl.createdAt);
	// 		return dataEl;
	// 	});
	
		// console.log(data);
		// res.json(data);
		res.render("board-list.pug", {datas});

	}catch(err)
	{
		next(err);
	}

});

// router.get("/writer", (req, res) => {

// 	res.render("board-write.pug");
// });

router.get("/delete/:id", async (req, res)=> {

	const data = await Board.destroy({
		where: {
			id: req.params.id
		}
	})
	
	res.redirect("/board");
});

router.post("/wr", async(req, res, next) => {

	

	const data = await Board.create({
		title: req.body.title,
		comment: req.body.comment,
		writer: req.body.writer
	});

	res.redirect("/board");
});

router.put('/update', async(req, res) => {
	
	const data = await Board.update({
		title: req.body.title,
		writer: req.body.writer,
		comment: req.body.comment,
	}, {
		where:{
			id:req.body.id
		}
	});	

	if(data[0]) res.redirect("/board");
	else res.json(data);

	// 여긴 Promise 모델로 구현, API 문서 찾아서 구현할 것
	// Board.update().then().catch() 이런식으로 구현, promise	 

});

module.exports = router;