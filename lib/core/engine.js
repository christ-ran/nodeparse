/* Imports. */
let utils = require("../utils");


/*
 * Handle the params.
 *
 * @param {String} url the url we're gonna parse.
 * */
function handleParams(url, thisParams, thisQueries) {
	/* Checking whether url is String or not */
	if (!utils.isString(url)) {
		throw "Error: url is type String.";	
	}
	/* Checking whether params is Array or not */
	if (!utils.isArray(thisParams)) {
		throw "Error: params is type Array.";
	}

	/* On splitting params. */
	let params = url.split("/");
	params.splice(0, 1);

	/* Handle queries */
	params.map((param) => {
		if (param.includes("?")) {
			thisParams.push(handleQueries(param, thisQueries));
			return;
		}
		
		/* Push to the params array */
		thisParams.push(param);
		return;
	});
}

/*
 * Handle the queries.
 *
 * @param {String} param the param we're gonna parse.
 * @param {Object} thisQueries the default query object.
	* */
function handleQueries(param, thisQueries) {
	let queries = param.split("?");
	let subQueries = queries[1].split("&");
	subQueries.map((query) => {
		let [key, value] = query.split("=");

		thisQueries[key] = value;
	});
	
	return queries[0];
}


module.exports = {
	handleParams: handleParams
};
