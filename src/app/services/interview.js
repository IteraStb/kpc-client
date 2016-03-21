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

        function getFullLogData() {
          getInterviewItems().then(
            function(fullLogResponse) {
              var response = fullLogResponse;
              return response;
            }
          )}

        function flattenLogData() {
          var response = getFullLogData(),
            flattenLogData = {};

          function recurse (currentValue, prop) {
            if (Object(currentValue) !== currentValue) {
              flattenLogData[prop] = currentValue;
            } else if (Array.isArray(currentValue)) {
              for (var i=0; i < currentValue.length; i++)
                recurse(currentValue[i], prop + "[" + i + "]");
              if (currentValue.length == 0)
                result[prop] = [];
            } else {
              var isEmpty = true;
              for (var p in currentValue) {
                isEmpty = false;
                recurse(currentValue[p], prop ? prop+"."+p : p);
              }
              if (isEmpty && prop)
                flattenLogData[prop] = {};
            }
          }

          recurse(response, "");
          return flattenLogData;

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
          getFullLogData: getFullLogData,
          flatenLogData: flattenLogData
        };
      }]);
