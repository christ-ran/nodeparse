"use strict";

let abstraction = require("../helpers/abstraction.js");
let engines = require("./engine");
let utils = require("../utils");

/*
 * Create object of NodeParse.
 *
 * @param {Object} domain The domain's url of the website.
 * */
function NodeParse(request, domain) {
	/*
	 * This constructor includes:
	 * request [object Object] - The HTTP request package.
	 * domain [object String] - The domain's url of the website.
	 * params [object Array] - The parameters when parsing the url.
	 * queries [object Object] - The queries when parsing the url.
	 * data [object Object] - The data in the HTTP body.
		* */
	this.request = request;
	this.domain = domain;
	this.params = [];
	this.queries = {};
	this.data = {};
}

/*
 * Create prototype objects.
 * */

/*
 * Parsing the params. 
 * */
NodeParse.prototype.init = async function init() {
	let url = abstraction.removeUrl(this.request.url, "favicon.ico");
	engines.handleParams(url, this.params, this.queries);
	this.data = await engines.handleData(this.request);
}

module.exports = NodeParse;
