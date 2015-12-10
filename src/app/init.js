angular.module('knowledgeList')
    .run(['$rootScope', '$state', '$stateParams', 'authorization',
        function($rootScope, $state, $stateParams, authorization) {
            'use strict';

            $rootScope.$on('$stateChangeStart', function(event, toState, toStateParams) {

                if( !authorization.isAuthorized() && toState.name !== 'login' ){

                    event.preventDefault();
                    $state.go('login');

                } else if (!authorization.isAllowedPage(toState.name, toStateParams.userId)){

                    event.preventDefault();
                }
            });
        }
    ]);
