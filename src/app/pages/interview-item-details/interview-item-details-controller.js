angular.module('knowledgeList').
controller('InterviewItemCtrl',
  [ '$scope',
    '$http',
    'interview',
    function ($scope,
              $http,
              interview) {
      'use strict';

      interview.getInterviewItems().then(
        function (interviewItemsResponse){
          $scope.sessionLog = interviewItemsResponse;
        }
      );
    }]);
