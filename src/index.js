/*
	This file is used for validating incoming request 
*/

import co from 'co'

import { equals } from 'ramda'
import helloWorldOne from '../src/user/helloWorldOne'
import helloWorldTwo from '../src/user/helloWorldTwo'
import helloWorldThree from '../src/user/helloWorldThree'
const qs = require('qs')

const functionMapper = {
    helloWorldOne,
    helloWorldTwo,
    helloWorldThree
}


/**
 *	[If incoming request is related to /user/helloWorldOne]
 *	@param {string} functionName [function name which will get invoked]
 *	@param {object} event [event object]
 *	@param {function} callback [callback function for lambda]
 */
const responseForHandlerOne = (functionName, event, callback) => {
    co(function* generator() {
        try {
            const { httpMethod, body, headers } = event
            const resp = yield functionMapper[functionName](event)
            return callback(null, resp)
        } catch (error) {
            return callback(null, error)
        }
    })
}

/**
 *	[If incoming request is related to /user/helloWorldTwo]
 *	@param {string} functionName [function name which will get invoked]
 *	@param {object} event [event object]
 *	@param {function} callback [callback function for lambda]
 */
const responseForHandlerTwo = (functionName, event, callback) => {
    co(function* generator() {
        try {
            const { httpMethod, body, headers } = event
            const resp = yield functionMapper[functionName](event)
            return callback(null, resp)
        } catch (error) {
            return callback(null, error)
        }
    })
}


/**
 *	[If incoming request is related to /user/helloWorldThree]
 *	@param {string} functionName [function name which will get invoked]
 *	@param {object} event [event object]
 *	@param {function} callback [callback function for lambda]
 */
const responseForHandlerThree = (functionName, event, callback) => {
    co(function* generator() {
        try {
            const { httpMethod, body, headers } = event
            const resp = yield functionMapper[functionName](event)
            return callback(null, resp)
        } catch (error) {
            return callback(null, error)
        }
    })
}



export {
    responseForHandlerOne,
    responseForHandlerTwo,
    responseForHandlerThree
}