'use strict';

angular.
    module('knowledgeList').
    filter('getRecentLogEntry', function () {
        return function(topic){
            var lastIndex = topic.log.length - 1;
            return topic.log[lastIndex];
        };
    });
