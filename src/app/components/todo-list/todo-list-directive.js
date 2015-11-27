angular
    .module('knowledgeList')
    .directive('todoList', ['$filter', function($filter){
        'use strict';

        return {
            templateUrl: '/components/todo-list/todo-list-template.html',
            restrict: 'AE',
            transclude: true,
            scope: {
                list: '=',
                onChangeCb: '='
            },
            link: function(scope){
                scope.onToggleCheck = function(){
                    this.item.completed = !$filter('toBoolean')(this.item.completed);

                    var checkedIndex = scope.list.indexOf(this.item);
                    scope.list.splice(checkedIndex, 1);
                    scope.list[ this.item.completed ? 'push' : 'unshift' ](this.item);                        

                    if (scope.onChangeCb){
                        scope.onChangeCb(scope.list);
                    }
                };
            }
        };
    }]);