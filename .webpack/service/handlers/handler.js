(function(e, a) { for(var i in a) e[i] = a[i]; }(exports, /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./handlers/handler.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./handlers/handler.js":
/*!*****************************!*\
  !*** ./handlers/handler.js ***!
  \*****************************/
/*! exports provided: helloWorldOne, helloWorldTwo, helloWorldThree */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _handlerOne__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./handlerOne */ "./handlers/handlerOne.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "helloWorldOne", function() { return _handlerOne__WEBPACK_IMPORTED_MODULE_0__["helloWorldOne"]; });

/* harmony import */ var _handlerTwo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./handlerTwo */ "./handlers/handlerTwo.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "helloWorldTwo", function() { return _handlerTwo__WEBPACK_IMPORTED_MODULE_1__["helloWorldTwo"]; });

/* harmony import */ var _handlerThree__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./handlerThree */ "./handlers/handlerThree.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "helloWorldThree", function() { return _handlerThree__WEBPACK_IMPORTED_MODULE_2__["helloWorldThree"]; });





/***/ }),

/***/ "./handlers/handlerOne.js":
/*!********************************!*\
  !*** ./handlers/handlerOne.js ***!
  \********************************/
/*! exports provided: helloWorldOne */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "helloWorldOne", function() { return helloWorldOne; });
/* harmony import */ var _src__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../src */ "./src/index.js");


const pino = __webpack_require__(/*! pino */ "pino")();

/**
 * [returns appropiarte response depending upon incoming request path. If path is related to post, then responseForHandlerOne.]
 * @param {string} functionName
 * @param {object} event
 * @param {function} context
 */

const createResponseForhelloWorldOne = (functionName, event, context) => {
    return Object(_src__WEBPACK_IMPORTED_MODULE_0__["responseForHandlerOne"])(functionName, event, (error, response) => context.done(error, response));
};

const helloWorldOne = (event, context) => createResponseForhelloWorldOne('helloWorldOne', event, context);



/***/ }),

/***/ "./handlers/handlerThree.js":
/*!**********************************!*\
  !*** ./handlers/handlerThree.js ***!
  \**********************************/
/*! exports provided: helloWorldThree */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "helloWorldThree", function() { return helloWorldThree; });
/* harmony import */ var _src__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../src */ "./src/index.js");


const pino = __webpack_require__(/*! pino */ "pino")();

/**
 * [returns appropiarte response depending upon incoming request path. If path is related to post, then responseForHandlerThree.]
 * @param {string} functionName
 * @param {object} event
 * @param {function} context
 */

const createResponseForhelloWorldThree = (functionName, event, context) => {
    return Object(_src__WEBPACK_IMPORTED_MODULE_0__["responseForHandlerThree"])(functionName, event, (error, response) => context.done(error, response));
};

const helloWorldThree = (event, context) => createResponseForhelloWorldThree('helloWorldThree', event, context);



/***/ }),

/***/ "./handlers/handlerTwo.js":
/*!********************************!*\
  !*** ./handlers/handlerTwo.js ***!
  \********************************/
/*! exports provided: helloWorldTwo */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "helloWorldTwo", function() { return helloWorldTwo; });
/* harmony import */ var _src__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../src */ "./src/index.js");


const pino = __webpack_require__(/*! pino */ "pino")();

/**
 * [returns appropiarte response depending upon incoming request path. If path is related to post, then responseForHandlerTwo.]
 * @param {string} functionName
 * @param {object} event
 * @param {function} context
 */

const createResponseForhelloWorldTwo = (functionName, event, context) => {
    return Object(_src__WEBPACK_IMPORTED_MODULE_0__["responseForHandlerTwo"])(functionName, event, (error, response) => context.done(error, response));
};

const helloWorldTwo = (event, context) => createResponseForhelloWorldTwo('helloWorldTwo', event, context);



/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! exports provided: responseForHandlerOne, responseForHandlerTwo, responseForHandlerThree */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "responseForHandlerOne", function() { return responseForHandlerOne; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "responseForHandlerTwo", function() { return responseForHandlerTwo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "responseForHandlerThree", function() { return responseForHandlerThree; });
/* harmony import */ var co__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! co */ "co");
/* harmony import */ var co__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(co__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ramda */ "ramda");
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(ramda__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _src_user_helloWorldOne__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../src/user/helloWorldOne */ "./src/user/helloWorldOne.js");
/* harmony import */ var _src_user_helloWorldTwo__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../src/user/helloWorldTwo */ "./src/user/helloWorldTwo.js");
/* harmony import */ var _src_user_helloWorldThree__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../src/user/helloWorldThree */ "./src/user/helloWorldThree.js");
/*
	This file is used for validating incoming request 
*/







const qs = __webpack_require__(/*! qs */ "qs");

const functionMapper = {
    helloWorldOne: _src_user_helloWorldOne__WEBPACK_IMPORTED_MODULE_2__["default"],
    helloWorldTwo: _src_user_helloWorldTwo__WEBPACK_IMPORTED_MODULE_3__["default"],
    helloWorldThree: _src_user_helloWorldThree__WEBPACK_IMPORTED_MODULE_4__["default"]

    /**
     *	[If incoming request is related to /user/helloWorldOne]
     *	@param {string} functionName [function name which will get invoked]
     *	@param {object} event [event object]
     *	@param {function} callback [callback function for lambda]
     */
};const responseForHandlerOne = (functionName, event, callback) => {
    co__WEBPACK_IMPORTED_MODULE_0___default()(function* generator() {
        try {
            const { httpMethod, body, headers } = event;
            const resp = yield functionMapper[functionName](event);
            return callback(null, resp);
        } catch (error) {
            return callback(null, error);
        }
    });
};

/**
 *	[If incoming request is related to /user/helloWorldTwo]
 *	@param {string} functionName [function name which will get invoked]
 *	@param {object} event [event object]
 *	@param {function} callback [callback function for lambda]
 */
const responseForHandlerTwo = (functionName, event, callback) => {
    co__WEBPACK_IMPORTED_MODULE_0___default()(function* generator() {
        try {
            const { httpMethod, body, headers } = event;
            const resp = yield functionMapper[functionName](event);
            return callback(null, resp);
        } catch (error) {
            return callback(null, error);
        }
    });
};

/**
 *	[If incoming request is related to /user/helloWorldThree]
 *	@param {string} functionName [function name which will get invoked]
 *	@param {object} event [event object]
 *	@param {function} callback [callback function for lambda]
 */
const responseForHandlerThree = (functionName, event, callback) => {
    co__WEBPACK_IMPORTED_MODULE_0___default()(function* generator() {
        try {
            const { httpMethod, body, headers } = event;
            const resp = yield functionMapper[functionName](event);
            return callback(null, resp);
        } catch (error) {
            return callback(null, error);
        }
    });
};



/***/ }),

/***/ "./src/user/helloWorldOne.js":
/*!***********************************!*\
  !*** ./src/user/helloWorldOne.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
async function helloWorldOne(event) {
    const response = {
        statusCode: 200,
        body: JSON.stringify({
            message: `Go Serverless v1.0! with helloworldOne`
        })
    };

    return response;
}

/* harmony default export */ __webpack_exports__["default"] = (helloWorldOne);

/***/ }),

/***/ "./src/user/helloWorldThree.js":
/*!*************************************!*\
  !*** ./src/user/helloWorldThree.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
async function helloWorldThree(event) {
    const response = {
        statusCode: 200,
        body: JSON.stringify({
            message: `Go Serverless v1.0! with helloWorldThree`
        })
    };

    return response;
}

/* harmony default export */ __webpack_exports__["default"] = (helloWorldThree);

/***/ }),

/***/ "./src/user/helloWorldTwo.js":
/*!***********************************!*\
  !*** ./src/user/helloWorldTwo.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
async function helloWorldTwo(event) {
    const response = {
        statusCode: 200,
        body: JSON.stringify({
            message: `Go Serverless v1.0! with helloWorldTwo`
        })
    };

    return response;
}

/* harmony default export */ __webpack_exports__["default"] = (helloWorldTwo);

/***/ }),

/***/ "co":
/*!*********************!*\
  !*** external "co" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("co");

/***/ }),

/***/ "pino":
/*!***********************!*\
  !*** external "pino" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("pino");

/***/ }),

/***/ "qs":
/*!*********************!*\
  !*** external "qs" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("qs");

/***/ }),

/***/ "ramda":
/*!************************!*\
  !*** external "ramda" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("ramda");

/***/ })

/******/ })));
//# sourceMappingURL=handler.js.map