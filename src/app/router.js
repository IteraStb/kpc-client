'use strict';

angular.
    module('knowledgeList').
    config(['$stateProvider', '$urlRouterProvider', function($stateProvider) {

        $stateProvider.
            state('login', {
                url: '/login',
                controller: 'LoginCtrl',
                templateUrl: './pages/login/login-template.html'
            }).
            state('base', {
                abstract: true,
                controller: 'BaseLayoutCtrl',
                templateUrl: './pages/base/layout-template.html'
            }).
            state('settings', {
                abstract: true,
                parent: 'base',
                views: {
                    navcontrols : {
                        controller: 'SettingsNavCtrl',
                        templateUrl: './pages/settings/nav-controls-template.html'
                    },
                    content: {
                        template: '<div ui-view="settingsContent"></div>'
                    }
                },
                resolve: {
                    userData: ['authorization', 'usersRepository', function(authorization, usersRepository){
                        return usersRepository.getUser(authorization.getAuthorizedUserId());
                    }]
                }
            }).
            state('settings.profile', {
                parent: 'settings',
                url: '/:userId/settings/profile',
                views: {
                    settingsContent: {
                        controller: 'SettingsProfileCtrl',
                        templateUrl: './pages/settings/profile/profile-template.html'
                    }
                },
                resolve: {
                    userData: ['$stateParams', 'usersRepository', function($stateParams, usersRepository){
                        return usersRepository.getUser($stateParams.userId);
                    }]
                }
            }).
            state('settings.users_list', {
                parent: 'settings',
                url: '/:userId/settings/users_list',
                views: {
                    settingsContent: {
                        controller: 'SettingsUsersListCtrl',
                        templateUrl: './pages/settings/users-list/users-list-template.html'
                    }
                },
            }).
            state('knowledge_list', {
                parent: 'base',
                url: '/:userId/knowledge_list',
                views: {
                    navcontrols : {
                        controller: 'KnowledgeListCtrl',
                        templateUrl: './pages/knowledge-list/nav-controls-template.html'
                    },
                    content: {
                        controller: 'KnowledgeListCtrl',
                        templateUrl: './pages/knowledge-list/content-template.html',
                    }
                },
                resolve: {
                    config : 'configResolver'
                }
            });
    }]).
    run(['$state', 'authorization', function($state, authorization){

        if (authorization.isAuthorized()){

            var userId = authorization.getAuthorizedUserId();
            var defaultPage = authorization.getDefaultPage();
            $state.go(defaultPage, {userId: userId});
        } else {

            $state.go('login');

        }
    }]);

