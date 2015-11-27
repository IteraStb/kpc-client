angular.
    module('knowledgeList').
    controller('LoginCtrl', ['$scope', '$state', 'authorization',
        function($scope, $state, authorization){
            'use strict';
            $scope.isErrorLogin = false;

            $scope.onSubmit = function(credentials){
                authorization
                    .authorize(credentials)
                    .then(function(){
                        var userId = authorization.getAuthorizedUserId();
                        var defaultPage = authorization.getDefaultPage();

                        $state.go(defaultPage, {userId: userId});

                    }, function(){
                        $scope.isErrorLogin = true;
                    });
            };
        }]);
