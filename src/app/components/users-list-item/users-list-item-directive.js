angular
    .module('knowledgeList')
    .directive('usersListItem', function(){
        'use strict';

        return {
            templateUrl: '/components/users-list-item/users-list-item-template.html',
            restrict: 'AE',
            transclude: true,
            scope: {
                user: '=',
                onViewKnowledgeList: '=',
                onViewProfile: '='
            }
        };
    });
