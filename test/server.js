"use strict";

const http = require("http");
const NodeParse = require("../lib/nodeparse");
const data = require("./data");

const server = http.createServer(function (req, res) {
	const nodeparse = new NodeParse(req, res);
	nodeparse.init();

	if (req.method === "GET") {
		if (nodeparse.queries) {
			console.log(nodeparse.queries);
			console.log(nodeparse.params);
		}
		res.writeHead(200, { "Content-Type": "application/json" });
		res.write(JSON.stringify(data));
		res.end();
	} 
	/*
	else if (req.method === "POST") {
		console.log(await nodeparse.data);
		res.write("OK!");
		res.end();
	}
	*/
});


server.listen(8080, function (error) {
	if (error) throw error;
	console.log(`Server is running on port 8080.`);
})
