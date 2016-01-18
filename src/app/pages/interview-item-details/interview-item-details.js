angular.module('knowledgeList')
  .factory('interview',
          ['$http',
            '$q',
      function ($http,
                $q) {
        'use strict';

          function getInterviewItems() {
            var deferred = $q.defer();

            $http.get('/api/logs')
              .then(function (logResponse) {

                if (logResponse.data) {
                  deferred.resolve(logResponse.data[0].knowledge_list[0].log);
                }
              });
            return deferred.promise;
          }

          return {
            getInterviewItems: getInterviewItems
          };
      }]);
