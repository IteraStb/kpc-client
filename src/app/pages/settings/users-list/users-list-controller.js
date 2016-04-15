angular.module('knowledgeList').controller('SettingsUsersListCtrl',
  ['$scope',
    '$state',
    'usersRepository',
    function ($scope,
              $state,
              usersRepository) {
      'use strict';

      usersRepository.getUsers().then(function (usersResponse) {
        $scope.users = usersResponse;
      });

      $scope.onViewKnowledgeList = function (e, userId) {
        $state.go('knowledge-list', {userId: userId});
        e.stopPropagation();
      };

      $scope.onViewProfile = function (e, userId) {
        $state.go('settings.profile', {userId: userId});
        e.stopPropagation();
      };

      $scope.onViewInterviewLog = function(e, userId) {
        $state.go('interview-log', {userId: userId});
        e.stopPropagation();
      }

    }]);
