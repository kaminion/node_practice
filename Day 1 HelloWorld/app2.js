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
