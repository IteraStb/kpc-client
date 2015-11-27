'use strict';

angular.
    module('knowledgeList').
    filter('calculateRatio', ['$filter', function ($filter) {
        return function(list, prop){
            if ( !(list instanceof Array) ) {
                return 0;
            }

            var all = list.length;
            var truthy = list.filter(function(item){ return $filter('toBoolean')(item[prop]); }).length;
            return truthy/all;
        };
    }]);
