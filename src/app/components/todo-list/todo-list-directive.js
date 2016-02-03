angular.module('knowledgeList').directive('todoList', ['$filter', function($filter){
  'use strict';

  return {
    templateUrl: '/components/todo-list/todo-list-template.html',
    restrict: 'AE',
    transclude: true,
    scope: {
      list: '=',
      onChangeCb: '=',
      userRole: '='
    },
    link: function (scope) {
      scope.onToggleCheck = function (event) {
        if (scope.userRole === 'admin') {
          event.preventDefault();
          event.stopPropagation();

          return;
        }

        this.item.completed = !$filter('toBoolean')(this.item.completed);

        var checkedIndex = scope.list.indexOf(this.item);
        scope.list.splice(checkedIndex, 1);
        scope.list[this.item.completed ? 'push' : 'unshift'](this.item);

        if (scope.onChangeCb) {
          scope.onChangeCb(scope.list);
        }
      };
    }
  };
}]);
