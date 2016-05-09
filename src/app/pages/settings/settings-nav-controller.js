angular.
  module('knowledgeList').
  controller('SettingsNavCtrl',
  [ '$scope',
    'userData',
    function($scope,
             userData) {

        'use strict';

        $scope.userData = userData;

    }]);
