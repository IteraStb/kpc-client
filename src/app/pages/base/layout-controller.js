angular.
module('knowledgeList').
controller('BaseLayoutCtrl',
  ['$scope',
  '$state',
  'authorization',
  'menuResolver',
    function ($scope,
              $state,
              authorization,
              menuResolver) {
      'use strict';

    var userId = authorization.getAuthorizedUserId(),
        authRole = authorization.getUserRole();

    $scope.authRole = authRole;
      console.log( $scope.authRole);


    menuResolver().then(function (menu) {
      $scope.menu = menu;
      console.log($scope.menu);
    });

    $scope.onClickMenuItem = function (item) {
      $state.go(item.state, {userId: userId});
    };

    $scope.logout = function () {
      authorization.logout().
      then(function () {
        $state.go('login');
      }, function (error) {
        console.error('Failed to log out', error);
      });
    };

  }]);
