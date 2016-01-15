angular.
  module('knowledgeList').
    factory('interview', ['$http',
       function ($http) {
         'use strict';

         function getInterviewItems() {

           $http.get('/api/logs')
             .then(function (logResponse) {

               return logResponse.data;

             });
         }

         return {
           getInterviewItems : getInterviewItems
         };
       }]);
