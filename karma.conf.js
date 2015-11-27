// Karma configuration
// Generated on Tue Dec 30 2014 10:36:01 GMT+0200 (FLE Standard Time)
module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter

    frameworks: [ 'mocha', 'chai', 'sinon-chai', 'chai-as-promised' ],
    plugins: [ 'karma-*', 'karma-ng-html2js-preprocessor' ],

    // list of files / patterns to load in the browser
    files: [
      'bower_components/angular/angular.js',
      'bower_components/angular-route/angular-route.js',
      'bower_components/jquery/dist/jquery.js',
      'bower_components/bootstrap/dist/js/bootstrap.js',
      'bower_components/angular-mocks/angular-mocks.js',
      'src/app/todo/todo-controller.js',
      'src/app/todo/todo-repository.js',
      'src/app/todo/to-do-repository-test.js',
      'src/app/todo/to-do-controller-test.js',
      'src/app/app.js',
      'src/app/router.js',
      '.tmp/y-templates.js'
    ],

    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'src/app/components/**/*.html': ['ng-html2js']
    },

    ngHtml2JsPreprocessor: {
      // strip this from the file path
      stripPrefix: 'src/app',
      // stripSufix: '.ext',
      // prepend this to the
      // prependPrefix: 'served/',

      // or define a custom transform function
      // cacheIdFromPath: function(filepath) {
      //   return cacheId;
      // },

      // setting this option will create only a single module that contains templates
      // from all the files, so you can load them all with module('foo')
      moduleName: 'knowledgeList'
    },
    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: [ 'PhantomJS' ],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false
  });
};
