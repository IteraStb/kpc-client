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
          var finalObject = {};
          var tempDate;

            knowledgeList.forEach(function(knowledgeListItem){
              knowledgeListItem.log.forEach(function(logItem) {
                if(logItem.date && tempDate !== logItem.date) {
                  tempDate = logItem.date;

                  var resultObject = {
                    date: logItem.date,
                    knowledgeInfo: {
                      title: knowledgeListItem.title,
                      score: logItem.score,
                      result: logItem.results.toString(),
                      goal: logItem.goals.toString()
                    }
                  };

                }

                angular.extend(finalObject, resultObject);


                if(result) {
                  deferred.resolve(result);
                }
              });

              result.push(finalObject);
            });
          return deferred.promise;
        }

        function callLogs() {
          getInterviewItems()
            .then(function (knowledgeList) {
              getLogs(knowledgeList)
                .then(function (logs) {
                  console.log(logs);
                });
            });
        }

        callLogs();

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
          getLogs: getLogs,
          callLogs: callLogs
          // getFullLogData: getFullLogData,
        };
      }]);
