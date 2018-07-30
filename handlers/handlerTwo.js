import {
    responseForHandlerTwo
} from '../src'

const pino = require('pino')()

/**
 * [returns appropiarte response depending upon incoming request path. If path is related to post, then responseForHandlerTwo.]
 * @param {string} functionName
 * @param {object} event
 * @param {function} context
 */

const createResponseForhelloWorldTwo = (functionName, event, context) => {
    return responseForHandlerTwo(functionName, event, (error, response) => context.done(error, response))
}

const helloWorldTwo = (event, context) => createResponseForhelloWorldTwo('helloWorldTwo', event, context)

export {
    helloWorldTwo
}