"use strict";

/*
 * Import modules.
 * http library.
 * */
const http = require("http");
const NodeParse = require("nodeparse");

/* Declare variables */
const port = process.env.PORT || 8080;


/* Create server */
const server = http.createServer(function (req, res) {
	const nodeparse = new NodeParse(req);		
	nodeparse.parseParams();
	if (req.method === "GET") {
		console.log("params ", nodeparse.params);
		console.log("queries ", nodeparse.queries);
		res.write("OK!");
		res.end();
	}
});

/* Listening */
server.listen(port, function (error) {
	if (error) throw error;
	console.log(`Server is running on ${port}.`);
	return;
});
