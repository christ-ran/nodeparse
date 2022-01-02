"use strict";

let obj = {};

/**
 * Convert an Array data value into an Object.
 *
 * @param {Array} arr the array we will convert.
	*/
function toObject(arr) {
	arr.forEach(function (value) {
		let foo = value.split("=");
		obj[foo[0]] = foo[1];
	});

	return obj;
}

/**
 * The action function for params.
 *
 * @param {Object} req the request object of http.createServer.
 * @param {String} url the url we gonna' split it.
*/
function parseParams(req, url) {
	if (url) {
		if (typeof url !== "string")	{ 
			throw "Error: params(url: String)";	
		}

		if (req.url !== "/favicon.ico") {
			let params = req.url.split(url);
	
			if(params.length === 1) {
				throw `Error: can't split the url with the given value ${url}, check again.`;
			}
			
			params = params[1].split("/");
			params.splice(0, 1);
			return params;
		}
	}

	if (req.url !== "/favicon.ico") {
		const params = req.url.split("/");
		params.splice(0, 1);
		if (params.length > 1) {
			const foo = params[params.length - 1].split("?")[0];
			params.splice(params.length - 1, params.length);
			params.push(foo);
		}
		return params;
	}
}

/**
 * The action function for query.
 *
 * @param {Object} req the request object of http.createServer.
*/
function parseQueries(req) {
	let params = req.url.split("?")[1];	
	if (!params) return;
	params = params.split("&");	
	return toObject(params);
}

/**
 * The action function for parsing the body's data.
 *
 * @param {Object} req the request object of http.createServer.
*/
async function parseData(req) {
	const buffers = [];
	for await (const chunk of req) {
		buffers.push(chunk);
	}
	const data = Buffer.concat(buffers).toString();
	if (data) {
		return JSON.parse(data);
	}
	return {};
}

module.exports = {
	parseData,
	parseParams,
	parseQueries,
}
