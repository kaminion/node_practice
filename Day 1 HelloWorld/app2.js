const express = require('express');
const app = express();

const host = "127.0.0.1";
const port = 3000;

app.listen(port, host, () => {
	console.log(`http://${host}:${port}`);
});

app.get("/", (req,res) => {
	res.send("<h1>Hello World</h1>");
});

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
	res.send(`${category} : ${id}`);

})
