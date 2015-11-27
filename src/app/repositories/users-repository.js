angular.
    module('knowledgeList').
    factory('usersRepository', ['$http', '$q', 'utils', function($http, $q, utils){
        'use strict';

        var users;

        function _saveToLocal(data){
            localStorage.setItem('KnListApp.Users', angular.toJson(data));
        }

        function _getFromLocal(){
            return localStorage.getItem('KnListApp.Users');
        }

        function getUsers(){
            var defer = $q.defer();
            var localDataStr = _getFromLocal();

            if (users){

                defer.resolve(users);

            } else if (localDataStr) {

                users = JSON.parse(localDataStr);
                defer.resolve(users);

            } else {

                $http.
                    get('/api/users').
                    success(function(usersData){
                        users = usersData;
                        defer.resolve(users);
                    }).
                    error(function(error){
                        defer.reject(error);
                    });
            }

            return defer.promise;
        }

        function getUser(userId){
            var defer = $q.defer();

            $http.get('/api/users/show/'+userId).then(function(response){
                var user = response.data;
                defer.resolve(user);

            }, function(error){
                defer.reject(error);
            });

            return defer.promise;
        }

        function createUser(userData){
            var defer = $q.defer();

            $http.post('/api/users/create', userData)
                .success(function(data){

                    console.log('data', data); //SHOULD RETURN SAVED USER's ID

                    users = null;
                    defer.resolve(data);
                }).
                error(function(error){
                    defer.reject(error);
                });

            return defer.promise;
        }

        function updateUser(id, userData){
            var defer = $q.defer();

            $http.post('/api/users/update/'+id, userData)
                .success(function(resp){
                    users = null;
                    defer.resolve(resp);
                }).
                error(function(error){
                    defer.reject(error);
                });

            return defer.promise;
        }

        function changePassword(id, passwords){
            var defer = $q.defer();

            if ( !utils.validatePassword(passwords.password_new) ){
                defer.reject({error: { password_new: 'WRONG_FORMAT'}});
            } else {
                $http.post('/api/users/change_password/'+id, passwords)
                    .success(function(resp){
                        if (resp.error){
                            defer.reject(resp);

                        } else {
                            users = null;
                            defer.resolve(resp);
                        }
                    }).
                    error(function(error){
                        defer.reject(error);
                    });
            }

            return defer.promise;
        }

        return {
            getUser   : getUser,
            getUsers  : getUsers,
            createUser: createUser,
            updateUser: updateUser,
            changePassword: changePassword
        };
    }]);
