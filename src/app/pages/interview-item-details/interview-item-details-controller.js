angular.module('knowledgeList').
controller('InterviewItemCtrl',
  [ '$scope',
    '$state',
    'usersRepository',
    '$stateParams',
    'authorization',
    'config',
    '$http',

    function ($scope,
              $state,
              $stateParams,
              usersRepository,
              authorization,
              config,
              $http) {
      'use strict';

      var userId = $stateParams.userId,
          knowledgeLogData;

      $http.get('/api/logs')
        .then(function (logResponse) {
          console.log(logResponse.data);

          $scope.sessionLog = logResponse.data;
        });



      //$scope.rights = authorization.getUserRights();
      //$scope.config = config;

    }]);
