'use strict';

angular.
    module('knowledgeList').
    filter('prioritize', function () {
        return function(topics, config){
            if (!config){
                return topics;
            }

            var shouldCount = (config.should || {}).count;
            var couldCount = (config.could || {}).count;

            if (isNaN(shouldCount)){
                shouldCount = 0;
            }

            if (isNaN(couldCount)){
                couldCount = 0;
            }

            var ranges = {
                'should'    : [0, shouldCount],
                'could'     : [shouldCount, shouldCount+couldCount],
                'could-not' : [shouldCount+couldCount, Infinity]
            };

            function getPriority(index){
                return Object.keys(ranges).filter(function(priority){
                    return ranges[priority][0] <= index && index < ranges[priority][1];
                })[0];
            }

            return (topics || []).map(function(topic, index){
                topic.priority = getPriority(index);
                return topic;
            });
        };
    });
