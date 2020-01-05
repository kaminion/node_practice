const express = require('express');
const app = express();
const port = 3000;
const host = '127.0.0.1';

app.listen(port, ()=>{
	console.log(`http://${host}:${port}`);
});

app.set("view engine", "pug");
app.set("views", "./views");

app.use("/", express.static("./public")); 
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

})
