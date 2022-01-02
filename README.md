# nodeparse 

![nodeparse-image](./images/nodeparse.PNG)

[![npm version](https://img.shields.io/npm/v/nodeparse.svg?style=flat-square)](https://www.npmjs.org/package/nodeparse)
[![install size](https://packagephobia.now.sh/badge?p=nodeparse)](https://packagephobia.now.sh/result?p=nodeparse)
[![npm downloads](https://img.shields.io/npm/dm/nodeparse.svg?style=flat-square)](http://npm-stat.com/charts.html?package=nodeparse)

A lightweight, vanilla replacement for Express framework when parsing the HTTP body's data or parsing the URL parameters and queries with NodeJS.

## Table of Contents

	- [Installing](#installing)
	- [Using](#using)
	-	[Parsing url params](#params)
	- [Parsing url queries](#queries)
	- [Parsing http data](#data)
	- [Built-in method](#builtin)

## Installing

Using npm:

```bash
$ npm install nodeparse
```

## Using

You first need to import the module.

```js
const NodeParse = require("nodeparse");
```

Create a basic NodeJS http server, create nodeparse instance and `init()` it.
```js
const http = require("http");
const NodeParse = require("nodeparse");

const server = http.createServer(function (req, res) {
	const nodeparse = new NodeParse(req, res);
	nodeparse.init();	
});

server.listen(port, function (error) {
	if (error) throw error;
	console.log("Server is running on port ", port);
});
```

## Parsing url params

In order to parse the URL params. You need to make sure it inside the `if (nodeparse.params)` because of the `favicon.ico` return `undefined`.

```js
const server = http.createServer(function (req, res) {
	const nodeparse = new NodeParse(req, res);
	nodeparse.init();

	if (req.method === "GET") {
		if(nodeparse.params) {
			console.log(nodeparse.params);	// => This will return an array of params.
			/*
				https://localhost:3000/api/products
				
				return => ["api", "products"]
			*/
		}
	}
});
```

## Parsing url queries

For url queries.

```js
const server = http.createServer(function (req, res) {
	const nodeparse = new NodeParse(req, res);
	nodeparse.init();
	
	if (req.method === "GET") {
		if (nodeparse.params) {
			console.log(nodeparse.queries); // => This will return an object of queries.
		}
		/*
			https://localhost:3000/api/products?name=banana&size=xl

			return => {"name": "banana", "size": "xl"}
		*/
	}
});
```

## Parsing the http data

Because `nodeparse.data` is a promise return from `req.on()` so you need to `await` with `nodeparse.data` inside an `async` function.

```js
const server = http.createServer(async function (req, res) {
	const nodeparse = new NodeParse(req, res);
	nodeparse.init();

	if (req.method === "POST") {
		console.log(await nodeparse.data);
	}
});
```

## Built-in method

Nodeparse has some built-in method, in stead of using:

```js
if (req.url === "/api/products" && req.method === "GET") {
	funtionToBeTriggered(res);
}
```

You can use this:

```js
nodeparse.isRoute("api/products", "GET", functionToBeTriggered);
```

## Credits

nodeparse is inspired by [express](https://github.com/expressjs/express) when developers have to deal with params, queries and data with NodeJS. 

## License

[MIT](LICENSE)
