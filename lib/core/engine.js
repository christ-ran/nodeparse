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
 * @return {String} first element.
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

/* 
	* Handle the data.
	*
	* @param {Object} request the incoming request object.
	* @param {Object} thisData the default data object.
	* */
async function handleData(request, thisData) {
	return await parseStream(request);
}

/*
	*
	* Parse the stream.
	*
	* @param {Object} event the event we're gonna parse.
	* */
function parseStream(event) {
	let data = "";
	return new Promise((resolve, reject) => {
		try {
			event.on("data", (chunk) => {
				data += chunk;
			});

			event.on("end", () => {
				resolve(JSON.parse(data));
			});
		} catch (error) {
			reject(error);
		}
	});
}


module.exports = {
	handleData: handleData,
	handleParams: handleParams,
};
