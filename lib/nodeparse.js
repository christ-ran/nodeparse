"use strict";

const core = require("./core/core");
const utils = require("./utils");

const format = ["url"];
const methods = {"GET": 0, "POST": 1, "UPDATE": 2, "DELETE": 3};

class NodeParse {
	/**
		* Constructor of NodeParse.
		*
		* @param {Object} req request of http.createServer.
		* @param {Object} res response of http.createServer.
		*/
	constructor(req, res) {
		this.req = req;
		this.res = res;
		this.handle;
		this.params;
		this.queries;
		this.data;
	}

	/* Methods main functions of class NodeParse */
	
	/**
		* Initialize the NodeParse.
		*
		* @param {String} url the url will be split.
		*/
	init(url) {
		if (this.req.url !== "/favicon.ico") {
			if (url && !utils.isString(url)) {
				throw `Error: init(url: String) - url must be a String type, current value url: ${url}.`;
			}

			let foo = core.parseParams(this.req, url);
			if (foo) {
				this.params = foo;
			}
			foo = core.parseQueries(this.req);
			if (foo) {
				this.queries = foo;
			}
			foo = core.parseData(this.req);
			if (foo) {
				this.data = foo;
			}
		}
	}

	/**
	 	* Checking which route to trigger the callback.
		*
		* @param {String} url the url of the route.
		* @param {String} method the method of the route.
		* @param {Function} callback the function will be triggered.
		*/
	isRoute(url, method, callback) {
		if (!utils.isString(url) || !utils.isString(method))	{ 
			throw "Error: isRoute(url: String, method: String, callback: Function => void) - url and method must be type string.";	
		}
		if (!(method in methods)) {
			throw "Error: isRoute(url: String, method: String, callback: Function => void) - method is invalid.";
		}	
		if (callback) {
			if (!utils.isAsyncFunction(callback)) {
				console.log(!utils.isFunction(callback));
				throw "Error: isRoute(url: String, method: String, callback: Function => void) - callback must be a function.";
			}
		}

		if (this.req.url === url && this.req.method === method) {
			callback(this.res);
		} 	
	}	
}

module.exports = NodeParse;
