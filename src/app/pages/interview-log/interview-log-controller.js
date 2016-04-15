angular.module('knowledgeList').controller('InterviewLogCtrl',
  ['$scope',
    'interview',
    function (
      $scope,
      interview
    ) {
      'use strict';

      //subscribe to the interview service promise
      //put flattened log data to scope
      interview.getNormalizedLogs().
      then(function (knowledgeList) {
        interview.getLogs(knowledgeList)
          .then(function (dataObject) {
            $scope.interviewHistory = interview.normalizeLogData(dataObject.dateArray, dataObject.result);
          });
      });
    }]);
