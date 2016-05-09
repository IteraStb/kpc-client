angular.
    module('knowledgeList').
    controller('SettingsProfileCtrl',
            ['$rootScope',
                '$scope',
                'userData',
                'usersRepository',
                '$modal',
                'utils',

        function($rootScope, $scope, userData, usersRepository, $modal, utils){
            'use strict';

            $scope.error = {};

            $scope.profile = {
                first_name: userData.first_name,
                last_name:  userData.last_name,
                email:      userData.email
            };

            $scope.onSubmit = function(formData){
                usersRepository.updateUser(userData.id, formData)
                    .then(function(){
                        var scope = $rootScope.$new();
                        scope.msg = 'User '+
                                    formData.first_name+' '+formData.last_name+
                                    ' was saved.';

                        $scope.error.profile = {};

                        $modal.open({
                            scope: scope,
                            templateUrl: '/components/modal/success-template.html'
                        });
                    }, function(err){
                        var scope = $rootScope.$new();
                        scope.msg = 'Failed to save user '+
                                    formData.first_name+' '+formData.last_name+'.';

                        $scope.error.profile = err.error;

                        $modal.open({
                            scope: scope,
                            templateUrl: '/components/modal/error-template.html'
                        });
                    });
            };

            $scope.onChangePassword = function(passwords){
                usersRepository.changePassword(userData.id, passwords)
                    .then(function(){
                        var scope = $rootScope.$new();
                        scope.msg = 'User\'s password was changed.';

                        $scope.error.passwords = {};

                        $modal.open({
                            scope: scope,
                            templateUrl: '/components/modal/success-template.html'
                        });
                    }, function(err){
                        var errMsg = utils.getErrorMsg(err.error);
                        var scope = $rootScope.$new();
                        scope.msg = errMsg;

                        $scope.error.password = err.error.password;

                        $modal.open({
                            scope: scope,
                            templateUrl: '/components/modal/error-template.html'
                        });
                    });
            };
        }]);
