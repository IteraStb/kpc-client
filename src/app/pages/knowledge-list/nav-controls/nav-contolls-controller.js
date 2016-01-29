angular.module('knowledgeList').controller('KnowledgeListNavCtrl',
  ['$rootScope',
    '$scope',
    '$state',
    '$stateParams',
    'usersRepository',
    'config',
    'authorization',
      function (
        $rootScope,
        $scope,
        $state,
        $stateParams,
        usersRepository,
        config,
        authorization) {

        'use strict';

        var userId = $stateParams.userId;

        $scope.rights = authorization.getUserRights();
        $scope.config = config;

        //emit 'modeChange' event to the rootScope
        $scope.onStartInterview = function () {
          $rootScope.$emit('modeChange', {mode: 'interview'});
        };

        usersRepository.getUser(userId).then(function (userData) {
          $scope.userData = userData;
        });

      }]);
