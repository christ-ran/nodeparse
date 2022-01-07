"use strict";

/*
	*	Check if object is an Array.
	*
	*	@param {Object} obj The object we want to test.
	*	@returns {Boolean} True if value is an array, otherwise false.
	* */
function isArray(obj) {
	return obj !== null && toString.call(obj) === "[object Array]";
}

/*
 * Check if object is an Object.
 *
 * @param {Object} obj The object we want to test.
 * @returns {Boolean} True if value is an Object, otherwise false.
 * */
function isObject(obj) {
	return obj !== null && typeof obj === "object";
}

/*
 * Check if object is a Number.
 *
 * @param {Object} obj The object we want to test.
 * @returns {Boolean} True if value is a Number, otherwise false.
 * */
function isNumber(obj) {
	return obj !== null && typeof obj === "number";
}

/*
 * Check if object is a String.
 *
 * @param {Object} obj The object we want to test.
 * @returns {Boolean} True if value is an String, otherwise false.
 * */
function isString(obj) {
	return obj !== null && typeof obj === "string";
}

/*
 * Check if object is a Function.
 *
 * @param {Object} obj The object we want to test.
 * @returns {Boolean} True if value is a Function, otherwise false.
 * */
function isFunction(obj) {
	return obj !== null && toString.call(obj) === "[object Function]";
}

/* Module exports */
module.exports = {
	isArray: isArray,
	isObject: isObject,
	isNumber: isNumber,
	isString: isString,
	isFunction: isFunction
};
