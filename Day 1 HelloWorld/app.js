const http = require("http");
const host = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, resp) => {
	
	resp.statusCode = 200;
	resp.setHeader('Content-Type', 'text/html;charset=utf-8');
	resp.end("<p>Hello World</p>");
});


server.listen(port, host, () => {
	console.log(`http://${host}:${port}`);
});
