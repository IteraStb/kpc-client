angular
    .module('knowledgeList')
    .directive('headingProgressBar', function(){
        'use strict';

        return {
            templateUrl: '/components/progress-bar/progress-bar-template.html',
            restrict: 'E',
            transclude: true,
            scope: {
                val: '='
            }
        };
    });