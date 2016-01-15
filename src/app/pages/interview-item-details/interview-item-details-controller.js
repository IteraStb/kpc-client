angular.module('knowledgeList').
controller('InterviewItemCtrl',
  [ '$scope',
    '$http',
    'interview',
    function ($scope,
              $http,
              interview) {
      'use strict';

      $scope.sessionLog = interview.getInterviewItems();

      //$scope.getWindowWidth = function () {
      //  var w;
      //
      //  w = angular.element(document.documentElement.clientWidth);
      //  console.log(w);
      //
      //  return w;
      //};
      //
      //$scope.windowWidth = $scope.getWindowWidth();
      //$scope.applyClassOnScreenSize = function () {
      //
      //};

      //$scope.rights = authorization.getUserRights();
      //$scope.config = config;
    }]);
