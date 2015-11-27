angular
    .module('knowledgeList')
    .directive('loginForm', function(){
        'use strict';

        return {
            templateUrl: '/components/login-form/login-form-template.html',
            restrict: 'E',
            transclude: true,
            scope: {
                onSubmit: '=',
                isErrored: '='
            },
            link: function(scope){
                scope.email = '';
                scope.password = '';

                scope.onKeyPress = function(keyCode){

                    if (keyCode === 13) {

                        if (scope.onSubmit) {

                            var credentials = {
                                email: scope.email,
                                password: scope.password
                            };

                            scope.onSubmit(credentials);
                        }
                    } else {

                        scope.isErrored = false;
                    }
                };
            }
        };
    });