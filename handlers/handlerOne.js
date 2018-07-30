import {
    responseForHandlerOne
} from '../src'

const pino = require('pino')()

/**
 * [returns appropiarte response depending upon incoming request path. If path is related to post, then responseForHandlerOne.]
 * @param {string} functionName
 * @param {object} event
 * @param {function} context
 */

const createResponseForhelloWorldOne = (functionName, event, context) => {
    return responseForHandlerOne(functionName, event, (error, response) => context.done(error, response))
}

const helloWorldOne = (event, context) => createResponseForhelloWorldOne('helloWorldOne', event, context)

export {
    helloWorldOne
}