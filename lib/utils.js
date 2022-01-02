"use strict";

/**
 * Determine if a value is a String
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a String, otherwise false
 */
function isString(val) {
	return typeof val === "string";
}

/**
 * Determine if a value is a Function
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */
function isFunction(val) {
  return toString.call(val) === '[object Function]';
}

/**
 * Determin if a value is an async function.
 *
 * @param {Object} val the value to test.
 * @param {boolean} True if value is an AsyncFunction, otherwise false
	*/
function isAsyncFunction(val) {
	return toString.call(val) === "[object AsyncFunction]";
}

/**
 * Determin if a value is an Promise function.
 *
 * @param {Object} val the value to test.
 * @param {boolean} True if value is a Promise, otherwise false
	*/
function isPromise(val) {
	return toString.call(val) === "[object Promise]";
}

module.exports = {
	isAsyncFunction,
	isFunction,
	isPromise,
	isString,
}


