angular.
    module('knowledgeList').
    filter('toBoolean', function () {
        'use strict';

        return function(val){
            return ['0', 0, 'false', false, 'undefined', undefined, 'null', null, ''].indexOf(val) === -1 ;
        };
    });
