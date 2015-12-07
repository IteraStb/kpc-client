angular.module('knowledgeList').controller('SettingsUsersListCtrl',
  ['$scope',
    '$state',
    'usersRepository',
    function ($scope,
              $state,
              usersRepository) {
      'use strict';

      usersRepository.getUsers().then(function (users) {
        $scope.users = users;
      });

      $scope.onViewKnowledgeList = function (e, userId) {
        $state.go('knowledge_list', {userId: userId});
        e.stopPropagation();
      };

      $scope.onViewProfile = function (e, userId) {
        $state.go('settings.profile', {userId: userId});
        e.stopPropagation();
      };

    }]);
