angular.module('knowledgeList').
controller('InterviewItemCtrl',
  [ '$scope',
    '$state',
    'usersRepository',
    '$stateParams',
    'authorization',
    'config',
    '$http',
    '$window',
    function ($scope,
              $state,
              $stateParams,
              usersRepository,
              authorization,
              config,
              $http,
              $window) {
      'use strict';

      var userId = $stateParams.userId;

      $http.get('/api/logs')
        .then(function (logResponse) {
          console.log(logResponse.data);

          $scope.sessionLog = logResponse.data;
        });

      $scope.getWindowWidth = function () {
        var w;

        w = angular.element(document.documentElement.clientWidth);
        console.log(w);

        return w;
      };

      $scope.windowWidth = $scope.getWindowWidth();
      $scope.applyClassOnScreenSize = function () {

      };



      //$scope.rights = authorization.getUserRights();
      //$scope.config = config;

    }]);
