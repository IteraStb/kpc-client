angular
  .module('knowledgeList')
  .directive('loginForm', function () {
    'use strict';

    return {
      templateUrl: '/components/login-form/login-form-template.html',
      restrict: 'E',
      transclude: true,
      scope: {
        onSubmit: '=signInCallback',
        isErrored: '='
      },
      link: function (scope) {
        scope.email = '';
        scope.password = '';

        var signIn = function () {
          if (scope.onSubmit) {

            var credentials = {
              email: scope.email,
              password: scope.password
            };

            scope.onSubmit(credentials);
          }
        };

        scope.onKeyPress = function (keyCode) {

          if (keyCode === 13) {
            signIn();
          } else {
            scope.isErrored = false;
          }
        };

        scope.onLoginClick = function () {
          signIn();
        };
      }
    };
  });
