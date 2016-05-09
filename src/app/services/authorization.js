angular.
    module('knowledgeList').
    factory('authorization', ['$http', '$q', '$cookieStore', 'usersRepository',
            function($http, $q, $cookieStore, usersRepository){
                'use strict';
                var authorizedUser;
                var allowedActions = {
                    admin: {
                        user: {
                            add: true
                        },
                        knowledge_list: {
                            priority: {
                                change: true
                            },
                            todo: {
                                add: true,
                                remove: true,
                                change: true
                            }
                        }
                    },
                    regular: {
                        user: {},
                        knowledge_list: {
                            priority: {},
                            todo: {
                                change: true
                            }
                        }
                    }
                };

                function _setAuthorizedUser(authdUserId, authdUserRole){
                    $cookieStore.put('authdUserId', authdUserId);
                    $cookieStore.put('authdUserRole', authdUserRole);
                }

                function getAuthorizedUserId(){
                    return $cookieStore.get('authdUserId');
                }

                function _getAuthorizedUserRole(){
                    return $cookieStore.get('authdUserRole');
                }

                function isAuthorized(){
                    return !!getAuthorizedUserId();
                }

                function isAllowedPage(pageName, userId){
                    var id = getAuthorizedUserId();
                    var role = _getAuthorizedUserRole();
                    return !userId || parseInt(userId) === parseInt(id) || role === 'admin';
                }

                function getUserRights(){
                    return allowedActions[_getAuthorizedUserRole()];
                }

                function getDefaultPage(){
                    var role = _getAuthorizedUserRole();
                    var defaultPages = {
                        admin:   'settings.users_list',
                        regular: 'knowledge-list'
                    };

                    return defaultPages[role];
                }

                function authorize(credentials){
                    var defer = $q.defer();

                    function onError(){
                        defer.reject({error: 'AUTHORIZATION_FAILED'});
                    }

                    $http.get('/api/login', { params: credentials}).then(function(response){
                        var data = response.data;

                        if (data && data.success && data.userId){

                            usersRepository.getUser(data.userId)
                                .then(function(user){
                                    _setAuthorizedUser(user.id, user.role);
                                    defer.resolve({success: 1});
                                }, onError);
                        } else {
                            onError();
                        }

                    }, onError );

                    return defer.promise;
                }

                function logout(){
                    var defer = $q.defer();

                    $http.get('/api/logout')
                        .then(function(){
                            $cookieStore.remove('authdUserId');
                            $cookieStore.remove('authdUserRole');

                            defer.resolve({success: 1});

                        }, function onError(){
                            defer.reject({error: 'LOGOUT_FAILED'});

                        });

                    return defer.promise;
                }

                return {
                    getAuthorizedUserId : getAuthorizedUserId,
                    authorize      : authorize,
                    getUserRole    : _getAuthorizedUserRole,
                    getUserRights  : getUserRights,
                    isAuthorized   : isAuthorized,
                    isAllowedPage  : isAllowedPage,
                    getDefaultPage : getDefaultPage,
                    logout         : logout
                };
            }]);
