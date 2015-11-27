angular.
    module('knowledgeList').
    controller('KnowledgeListCtrl',
            ['$rootScope',
                '$scope',
                '$state',
                '$stateParams',
                'usersRepository',
                'config',
                '$modal',
                'authorization',

        function($rootScope, $scope, $state, $stateParams, usersRepository, config, $modal, authorization){
            'use strict';
            var userId    = $stateParams.userId;
            $scope.rights = authorization.getUserRights();
            $scope.config = config;

            $scope.onGoalsChange = function(){
                usersRepository.updateKnList($scope.userData);
            };

            $scope.onFileUpload = function(contents){
                try{
                    var user = JSON.parse(contents);
                    usersRepository.createUser(user).then(function(storedUser){
                        $state.go('knowledge_list', { userId: storedUser.id });
                    });

                } catch(error){
                    var scope = $rootScope.$new();
                    scope.msg = 'Invalid file data. Please, load json-ish file.';

                    $modal.open({
                        scope: scope,
                        templateUrl: '/components/modal/error-template.html',
                    });
                }
            };

            usersRepository.getUser(userId).then(function(userData){
                $scope.userData = userData;
            });

        }]);
