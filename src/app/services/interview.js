angular.module('knowledgeList')
  .factory('interview', [
    '$http',
    '$q',
      function (
        $http,
        $q) {
        'use strict';

        function getInterviewItems() {
          var deferred = $q.defer();

          $http.get('/api/logs')
            .then(function (logResponse) {

              if (logResponse.data) {
                deferred.resolve(logResponse.data[0].knowledge_list);
              }
            });
          return deferred.promise;
        }

        /**
         * Flattens received array
         * @param knowledgeList [Array]
         * @returns {deferred.promise|{then, catch, finally}}
         */
        function getLogs(knowledgeList) {
          var deferred = $q.defer();
          var result = [];

            knowledgeList.forEach(function(knowledgeListItem){
              knowledgeListItem.log.forEach(function(logItem) {
                var resultObject = {
                  title: knowledgeListItem.title,
                  date: logItem.date,
                  score: logItem.score,
                  result: logItem.results,
                  goal: logItem.goals
                };
                result.push(resultObject);

                if(result) {
                  deferred.resolve(result);
                }
              });
            });
          return deferred.promise;
        }

        function getCurrentDate() {
          var today,
            mm,
            dd,
            yy;

          today = new Date();
          yy = today.getFullYear();

          //+1 because January is 0
          mm = today.getMonth() + 1;
          dd = today.getDate();

          today = dd + '/' + mm + '/' + yy;

          return today;
        }

        return {
          getInterviewItems: getInterviewItems,
          getCurrentDate: getCurrentDate,
          getLogs: getLogs
          // getFullLogData: getFullLogData,
        };
      }]);
