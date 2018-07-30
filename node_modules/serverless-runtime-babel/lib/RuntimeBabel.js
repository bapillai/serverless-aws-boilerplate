'use strict';

module.exports = function(S) {

  const SError = require(S.getServerlessPath('Error')),
    SCli       = require(S.getServerlessPath('utils/cli')),
    _          = require('lodash'),
    BbPromise  = require('bluebird'),
    chalk      = require('chalk'),
    spawnSync  = require('child_process').spawnSync,
    path       = require('path'),
    fs         = BbPromise.promisifyAll(require('fs'));

  class RuntimeBabel extends S.classes.Runtime {

    constructor() {
      super();
    }

    static getName() {
      return 'babel';
    }

    getName(providerName) {
      if (providerName === 'aws') {
        return 'nodejs'
      } else {
        return RuntimeBabel.getName();
      }
    }

    /**
     * Scaffold
     * - Create scaffolding for new Node.js function
     */

    scaffold(func) {
      const handlerPath = path.resolve(__dirname, '..', 'templates', 'handler.js');

      func.handler = 'handler.default';

      return fs.readFileAsync(handlerPath)
        .then(handlerJs => BbPromise.all([
          func.save(),
          S.utils.writeFile(func.getRootPath('handler.js'), handlerJs),
          S.utils.writeFile(func.getRootPath('event.json'), {})
        ]));
    }

    /**
     * Run
     * - Run this function locally
     */

    run(func, stage, region) {

      return BbPromise.all([
          S.utils.readFile(func.getRootPath('event.json')),
          this.getEnvVars(func, stage, region)
        ])
        .spread((event, envVars) => {
          const childArgs = [__dirname + '/babel-runner'];
          const resultSep = '___serverless_function_run_results___';
          const input = JSON.stringify({
            event,
            resultSep,
            handler: func.handler,
            name: func.getDeployedName({stage, region}),
            dir: func.getRootPath(),
            babelOptions: this.getBabelOptions(func)
          });

          const env = _.merge(envVars, process.env, {
            NODE_PATH: path.resolve(__dirname, '..', 'node_modules')
          })

          const child = spawnSync(process.execPath, childArgs, {env, input});

          if (child.error) return BbPromise.reject(child.error);

          if (!_.isEmpty(child.stderr.toString())) {
            SCli.log(chalk.red.bold('Failed - This Error Was Thrown:'));
            console.error(child.stderr.toString());
            return BbPromise.resolve()
          }

          const resultArray = child.stdout.toString().split(resultSep);
          let results = resultArray[1]

          try {
            results = JSON.parse(resultArray[1]);
          } catch(e) {}

          if (!_.isEmpty(resultArray[0])) process.stdout.write(resultArray[0]);

          if (results.status === 'success') {
            SCli.log(chalk.green.bold('Success! - This Response Was Returned:'));
            console.log(JSON.stringify(results.response, null, 2));
          } else {
            SCli.log(chalk.red.bold('Failed - This Error Was Returned:'));
            SCli.log(results.response);
            if (results.stack) console.log(results.stack);
          }

          return BbPromise.resolve(results);
        });
    }

    /**
     * Build
     * - Build the function in this runtime
     */

    build(func, stage, region) {

      // Validate
      if (!func._class || func._class !== 'Function') return BbPromise.reject(new SError('A function instance is required'));

      return this.createDistDir(func.name).then(pathDist => {
        return this.copyFunction(func, pathDist, stage, region)
          .then(() => this._addEnvVarsInline(func, pathDist, stage, region))
          .then(() => this._browserify(func, pathDist))
          .then(() => this._cleanup(pathDist))
          .then(() => pathDist);
      });
    }

    getBabelOptions(func) {
      return _.defaults(_.get(func, 'custom.runtime.babel'), {
        presets: ['es2015']
      });
    }

    _browserify(func, pathDist) {

      const babelOpts = this.getBabelOptions(func);

      if (_.includes(babelOpts.presets, 'es2015')) {
        let idx = _.indexOf(babelOpts.presets, 'es2015');
        babelOpts.presets[idx] = require('babel-preset-es2015');
      }

      const config = _.defaultsDeep(_.get(func, 'custom.runtime'), {
        handlerExt:   'js',
        requires:     [],
        plugins:      [],
        transforms:   [{name: 'babelify', opts: babelOpts}],
        exclude:      ['aws-sdk'],
        ignore:       [],
        extensions:   [],
        minify: true
      });

      if (config.minify) {
        config.plugins.push({
          name: 'minifyify',
          opts: {map: false}
        });
      }

      const handlerFileName = this.getHandler(func).split('.')[0] + '.' + config.handlerExt;

      let b = require('browserify')({
        basedir:          pathDist,
        entries:          [handlerFileName],
        standalone:       'lambda',
        extensions:       config.extensions,
        browserField:     false,  // Setup for node app (copy logic of --node in bin/args.js)
        builtins:         false,
        commondir:        false,
        // ignoreMissing:    true,  // Do not fail on missing optional dependencies
        detectGlobals:    true,  // Default for bare in cli is true, but we don't care if its slower
        insertGlobalVars: {process: () => {}} // Handle process https://github.com/substack/node-browserify/issues/1277
      });

      // browserify.require / .plugin / .transform
      ['require', 'plugin', 'transform'].forEach(key => {
        config[key + 's'].map(item => {
          if (_.isString(item)) item = {name: item};
          let val = (key === 'require' ? item.name : require(item.name));
          b[key](val, item.opts);
        });
      });

      // browserify.exclude
      config.exclude.forEach(file => b.exclude(file));

      // browserify.ignore
      config.ignore.forEach(file => b.ignore(file));

      // Perform Bundle
      const pathBundle = path.join(pathDist, handlerFileName);

      return BbPromise.fromCallback(cb => b.bundle(cb))
        .then((buf) => fs.writeFileAsync(pathBundle, buf));
    }


    /**
     * Get Handler
     */

    getHandler(func) {
      return path.join(path.dirname(func.handler), "_serverless_handler.handler").replace(/\\/g, '/');
    }

    /**
     * Install NPM Dependencies
     */

    installDependencies(dir) {
      SCli.log(`Installing NPM dependencies in dir: ${dir}`);
      SCli.log(`-----------------`);
      S.utils.npmInstall(S.getProject().getRootPath(dir));
      SCli.log(`-----------------`);
    }

    /**
     * Add ENV Vars In-line
     * - Adds a new handler that loads in ENV vars before running the main handler
     */

    _addEnvVarsInline(func, pathDist, stage, region) {

      return this.getEnvVars(func, stage, region)
        .then(envVars => {

          const handlerArr = func.handler.split('.'),
            handlerDir = path.dirname(func.handler),
            handlerFile = handlerArr[0].split('/').pop(),
            handlerMethod = handlerArr[1];

          const loader = `
            'use strict';

            const envVars = ${JSON.stringify(envVars, null, 2)};

            for (let key in envVars) {
              process.env[key] = envVars[key];
            }

            exports.handler = (event, context) => {
              try {
                const result = require('./${handlerFile}')['${handlerMethod}'](event, context);

                if (result && typeof result.then == 'function') {
                  result.then(context.succeed).catch(context.fail);
                  return;
                }

                if(result !== undefined) context.succeed(result);
              } catch(e) {
                context.fail(e);
              }
            };
          `;


          return fs.writeFileAsync(path.join(pathDist, handlerDir, '_serverless_handler.js'), loader);
        });
    }

    /**
     * Cleanup pathDist
     * - removes all non-bundled .js and .json files from the pathDist
     */

    _cleanup(pathDist) {
      let ignore = '**/_serverless_handler.js';
      S.utils.sDebug('cleaning up');
      return BbPromise
        .fromCallback(cb => require('glob')(`${pathDist}/**/*+(.js|.json)`, {ignore}, cb))
        .map((filepath) => fs.lstatAsync(filepath).then(stats => stats.isFile() && fs.unlinkAsync(filepath)))
        .then(() => S.utils.sDebug('done cleaning up'))
    }

  }

  return RuntimeBabel;

};
