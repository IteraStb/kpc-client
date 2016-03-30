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
          var resultObject = {};
          var dateArray = [];
          var dateObject = {};
          var dates = {};

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

                  // dates = {
                  //   date: logItem.date
                  // };

                  dateArray.push(logItem.date);
                  dateObject[logItem.date] = logItem.date;
                }

                result.push(resultObject);

                if(result) {
                  deferred.resolve({result:result, dateArray:dateArray});
                }
              });
            });
          console.log(dateArray);
          return deferred.promise;
        }

        function callLogs() {
          getInterviewItems()
            .then(function (knowledgeList) {
              getLogs(knowledgeList)
                .then(function (dataObject) {
                  console.log(dataObject.result);
                  //console.log(dataObject.dateArray);
                  normalizeDatesArray(dataObject.dateArray);
                });
            });
        }

        callLogs();

        function normalizeDatesArray(dateArray) {

            dateArray.sort(function (a, b) {
              return a < b ? 1 : a > b ? -1 : 0;
            });
          console.log('This should be filtered date array', dateArray);
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
          callLogs: callLogs
          // getFullLogData: getFullLogData,
        };
      }]);
