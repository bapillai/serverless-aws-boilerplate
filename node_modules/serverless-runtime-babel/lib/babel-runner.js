'use strict';

const BbPromise = require('bluebird'),
  path = require('path');

const guid = () => {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
  }

  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

const getConfig = () => new BbPromise((resolve, reject) => {
  let data = ''
  process.stdin.setEncoding('utf8');

  process.stdin.on('readable', () => {
    let chunk = process.stdin.read();
    if (chunk !== null) {
      data = data + chunk;
    }
  });

  process.stdin.on('end', () => resolve(JSON.parse(data)));
});

const runFunc = (fn, name, event) => {
  return new BbPromise((resolve, reject) => {
    let ctx = {
      awsRequestId: guid(),
      invokeid: guid(),
      logGroupName: `/aws/lambda/${name}`,
      logStreamName: '2015/09/22/[HEAD]13370a84ca4ed8b77c427af260',
      functionVersion: '$LATEST',
      isDefaultFunctionVersion: true,
      functionName: name,
      memoryLimitInMB: '1024',
      succeed: resolve,
      fail: reject,
      done: (err, res) => err ? reject(err) : resolve(res)
    };

    try {
      const result = fn(event, ctx);

      if (result && typeof result.then == 'function') {
        result.then(ctx.succeed).catch(ctx.fail);
        return;
      }

      if(result !== undefined) ctx.succeed(result);
    } catch(e) {
      ctx.fail(e);
    }

  });
}

getConfig().then((config) => {

  require("babel-register")(config.babelOptions);

  const handlerArr  = config.handler.split('/').pop().split('.'),
    functionFile    = path.join(config.dir, handlerArr[0]),
    functionHandler = handlerArr[1],
    fn = require(functionFile)[functionHandler];

  return runFunc(fn, config.name, config.event)
    .then(response => {
      return {
        status: 'success',
        response
      };
    })
    .catch(err => {
      return {
        status: 'error',
        response: err.message || err,
        stack: err.stack,
        error: err
      };
    })
    .then(out => {
      process.stdout.write(config.resultSep + JSON.stringify(out))
    })
});

