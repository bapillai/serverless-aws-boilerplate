const vogels = require('vogels');
const pino = require('pino')()
const joi = require('joi')
const config = require('../config.json')

const credentials = {
    region: config.region,
    endpoint: config.endpoint
}
vogels.AWS.config.update(credentials);

// dynamoDB Schema Definitions
const Hello = vogels.define('Hello', {
    hashKey: 'rrNumber',
    timestamps: true,
    schema: {
        userId: vogels.types.uuid(),
        email: joi.string().email()
    }
});


// create dynamoDB Tables
vogels.createTables({
    Hello: { readCapacity: 1, writeCapacity: 1 },
}, (err) => {
    if (err) {
        pino.info('Error creating table: ', err)
    } else {
        pino.info('all required tables have been created')
    }
})


module.exports = { Hello }