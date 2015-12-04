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
        'bower_components/jquery/dist/jquery.js',
        'bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
        'bower_components/angular-ui-router/release/angular-ui-router.js',
        'bower_components/jquery-ui/jquery-ui.js',
        'bower_components/angular-ui-sortable/sortable.js',
        'bower_components/ng-multi-transclude/src/multi-transclude.js',
        'bower_components/lodash/lodash.js',
        'bower_components/angular-cookies/angular-cookies.js',
        'bower_components/bootstrap/dist/js/bootstrap.js',
        'bower_components/angular-mocks/angular-mocks.js',
        'src/app/app.js',
        'src/app/pages/settings/users-list/users-list-controller.js',
        'src/app/pages/settings/profile/profile-controller.js',
        'src/app/pages/settings/settings-nav-controller.js',
        'src/app/pages/login/login-controller.js',
        'src/app/pages/knowledge-list/knowledge-list-controller.js',
        'src/app/pages/base/layout-controller.js',
        'src/app/components/users-list-item/users-list-item-directive.js',
        'src/app/components/todo-list/todo-list-directive.js',
        'src/app/components/sortable-accordion/sortable-accordion-directive.js',
        'src/app/components/sidebar/sidebar-directive.js',
        'src/app/components/progress-bar/progress-bar-directive.js',
        'src/app/components/profile-form/profile-form-directive.js',
        'src/app/components/login-form/login-form-directive.js',
        'src/app/components/file-upload-btn/file-upload-btn-directive.js',
        'src/app/services/utils.js',
        'src/app/services/menu-resolver.js',
        'src/app/services/config-resolver.js',
        'src/app/services/authorization.js',
        'src/app/repositories/users-repository.js',
        'src/app/filters/to-boolean.js',
        'src/app/filters/prioritize.js',
        'src/app/filters/get-recent-log-entry.js',
        'src/app/filters/calculate-ratio.js',
        'src/app/router.js',
        'src/app/init.js',
        '.tmp/knowledge-checker-templates.js',
        'src/app/components/file-upload-btn/file-upload-btn-template.html',
        'src/app/components/login-form/login-form-template.html',
        'src/app/components/modal/error-template.html',
        'src/app/components/modal/success-template.html',
        'src/app/components/profile-form/profile-form-template.html',
        'src/app/components/progress-bar/progress-bar-template.html',
        'src/app/components/sidebar/sidebar-template.html',
        'src/app/components/sortable-accordion/sortable-accordion-template.html',
        'src/app/components/todo-list/todo-list-template.html',
        'src/app/components/users-list-item/users-list-item-template.html',
        'src/app/pages/base/layout-template.html',
        'src/app/pages/knowledge-list/content-template.html',
        'src/app/pages/knowledge-list/nav-controls-template.html',
        'src/app/pages/login/login-template.html',
        'src/app/pages/settings/nav-controls-template.html',
        'src/app/pages/settings/profile/profile-template.html',
        'src/app/pages/settings/users-list/users-list-template.html',
        'src/app/filters/calculate-ratio.spec.js',
        'src/app/filters/get-recent-log-entry.spec.js',
        'src/app/filters/prioritize.spec.js',
        'src/app/filters/to-boolean.spec.js',
        'src/app/services/authorization.spec.js',
        'src/app/components/todo-list/todo-list-directive.spec.js',
        'src/app/pages/knowledge-list/knowledge-list-controller.spec.js',
        'src/app/pages/login/login-controller.spec.js'
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
