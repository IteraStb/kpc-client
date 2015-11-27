angular
    .module('knowledgeList')
    .directive('profileForm', function(){
        'use strict';

        return {
            templateUrl: '/components/profile-form/profile-form-template.html',
            restrict: 'E',
            scope: {
                profile: '=',
                onSubmit: '=',
                onChangePassword: '=',
                error: '='
            }
        };
    });
