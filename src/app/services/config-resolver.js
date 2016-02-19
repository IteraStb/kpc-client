angular.
    module('knowledgeList').
    factory('configResolver', ['$http', function($http){
        'use strict';
        var config;

        return config || $http.get('data/config.json').then(function(_config_){ config = _config_.data; return config; });
    }]);
