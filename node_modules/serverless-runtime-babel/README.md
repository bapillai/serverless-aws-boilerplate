# Babel Runtime for [Serverless](http://serverless.com)

[![serverless](http://public.serverless.com/badges/v3.svg)](http://www.serverless.com)

## Features 
 *  **Runs locally and deploys functions written in ES2015 syntax (via [Babel](https://babeljs.io/))**
 *  *Classic* and *Modern JS Style* handlers
 *  Browserifies, minifies your functions on deployment

## Install
**Note:** Serverless v0.5.0 or higher is required.
* Install via npm in the root of your Serverless Project: `npm install serverless-runtime-babel --save`
* In the `plugins` array in your `s-project.json` add `"serverless-runtime-babel"`
* All done!

## Usage
All you need is to set `runtime` property of `s-function.json` to `babel`.
You could use the classic style handler when you need to call `context.done()` or the modern style when your functions should return a promise.

### Classic Style
```javascript
/* handler.js */
'use strict';

module.exports.handler = function(event, context) {

  /* Everything is the same but better */
  let [name, age, isAdmin] = ['bob', 23, false];
  let user = {name, age};

  return context.done(null, {
    isAdmin,
    userName: user.name,
    userAge: user.age
  });
};
```

### Modern JS Style
```javascript
/* event.json */
{
  "repos": [
    "serverless/serverless",
    "serverless/serverless-runtime-babel"
  ]
}
```
```javascript
/* handler.js */
import "babel-polyfill"
import request from "request-promise"

const headers = {
  'User-Agent': 'Serverless'
};

export default ({repos}) => {

  return Promise.all(repos.map(repo => {
    let uri = `https://api.github.com/repos/${repo}`

    return request({headers, uri, json: true})
      .then(({stargazers_count}) => ({repo, stars: stargazers_count}))
  }))
​
}
```

### Scaffold
You can use `serverless function create` as usual — it will promt you for a runtime unless you add the `-r babel` flag.

### Examples
* [GitHub stargazers example](https://github.com/serverless/serverless-runtime-babel/tree/master/examples/stars) - Returns amount of starts for a GitHub repo

## Options

Configuration options can be used by setting the `custom.runtime` of `s-function.json`. The following options are available:

* `babel` — An object with a [Babel configuration](https://babeljs.io/docs/usage/options/)

* `minify` — When set to `true`, this will enable minification. Default: `true`.

### Browserify Options

Browserify options can be included as normal configuration options to the `runtime` object. The following options are supported:

* handlerExt
* requires
* plugins
* transforms
* exclude
* ignore (defaults to `["aws-sdk"]`)
* extensions

For more information on these options, please visit the [Browserify Documentaton](https://github.com/substack/node-browserify#usage).

### Example

Example Babel Runtime configuration with default values:

```javascript
{
  /*s-function.json*/
  /*...*/
  "runtime": "babel",
  "custom": {
    "runtime": {
      "babel": { 
      	"presets": ["es2015"]
      },
      "handlerExt": "js",
      "requires": [],
      "plugins": [],
      "transforms": [],
      "exclude": [],
      "ignore": [
        "aws-sdk"
      ],
      "extensions": [],
      "minify": true
    }
  },
  /*...*/
}
```
