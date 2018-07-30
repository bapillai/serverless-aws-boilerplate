import {
    responseForHandlerThree
} from '../src'

const pino = require('pino')()

/**
 * [returns appropiarte response depending upon incoming request path. If path is related to post, then responseForHandlerThree.]
 * @param {string} functionName
 * @param {object} event
 * @param {function} context
 */

const createResponseForhelloWorldThree = (functionName, event, context) => {
    return responseForHandlerThree(functionName, event, (error, response) => context.done(error, response))
}

const helloWorldThree = (event, context) => createResponseForhelloWorldThree('helloWorldThree', event, context)

export {
    helloWorldThree
}