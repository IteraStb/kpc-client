angular
    .module('knowledgeList')
    .directive('sidebar', ['$document', function($document){
        'use strict';

        return {
            templateUrl: '/components/sidebar/sidebar-template.html',
            restrict: 'AE',
            replace: true,
            scope: {
                items: '=',
                onClickMenuItem: '='
            },
            link: function(scope, element){

                $('.sidebar-wrapper', element).height($(document).height());

                // $document.click(function(event){
                //     var isChild = element.has(event.target).length > 0;
                //     var isSelf = element[0] == event.target;
                //     var isInside = isChild || isSelf;
                //     if (!isInside) {
                //         scope.isVisible = false;
                //     }
                // });

                scope.onClickItem = function(){
                    if (this.item.children){
                        this.item.expanded = !this.item.expanded;
                    } else if (scope.onClickMenuItem) {
                        scope.onClickMenuItem(this.item);
                    }
                };

                scope.onClickChild = function(){
                    if (scope.onClickMenuItem) {
                        scope.onClickMenuItem(this.child);
                    }
                };

            }
        };
    }]);