angular.module('knowledgeList')
  .factory('interview', [
    '$http',
    '$q',
      function (
        $http,
        $q) {
        'use strict';

        /**
         * Gets logs from server
         * @returns {deferred.promise|{then, catch, finally}}
         */
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
         * Maps Knowledge List array to flattened array
         * Reduces date values to unique ones
         * @param knowledgeList [Array]
         * @returns {deferred.promise|{then, catch, finally}}
         */
        function getLogs(knowledgeList) {
          var deferred = $q.defer();
          var result = [];
          var resultObject = {};
          var dateArray = [];
          var dateObject = {};

            knowledgeList.forEach(function(knowledgeListItem){
              knowledgeListItem.log.forEach(function(logItem) {
                resultObject = {
                  date: logItem.date,
                  title: knowledgeListItem.title,
                  score: logItem.score,
                  result: logItem.results.toString(),
                  goal: logItem.goals.toString()
                };

                if (!dateObject[logItem.date]) {
                  dateArray.push(logItem.date);
                  dateObject[logItem.date] = logItem.date;
                }

                result.push(resultObject);

                if(result) {
                  deferred.resolve({result:result, dateArray:dateArray});
                }
              });
            });

          return deferred.promise;
        }

        function getNormalizedLogs() {
          return getInterviewItems();
        }

        /**
         * Reverses dates array and generates array by unique dates only
         * @param dateArray [Array]
         * @param logs [Array]
         */
        function normalizeDatesArray(dateArray, logs) {
          var result = [];

            dateArray.sort(function (a, b) {
              return a < b ? 1 : a > b ? -1 : 0;
            });

          dateArray.forEach(function (dateString) {
             var newLogs = logs.filter(function (logItem) {
              return dateString === logItem.date
            });
            result.push({
              date: dateString,
              value: newLogs
            });
          });
          return result;
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
          getLogs: getLogs,
          getNormalizedLogs: getNormalizedLogs,
          normalizeLogData: normalizeDatesArray
        };
      }]);
