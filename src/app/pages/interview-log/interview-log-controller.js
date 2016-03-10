angular.module('knowledgeList').controller('InterviewLogCtrl',
  ['$scope',
    'interview',
    function (
      $scope,
      interview
    ) {
      'use strict';

      //subscribe to the interview service promise
      interview.getInterviewItems().then(
        function (interviewItemsResponse) {
          $scope.iterviewLogItems = interviewItemsResponse;
        }
      );


    }]);
