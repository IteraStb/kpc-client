angular
    .module('knowledgeList')
    .directive('sortableAccordion', function(){
        'use strict';

        return {
            templateUrl: '/components/sortable-accordion/sortable-accordion-template.html',
            restrict: 'AE',
            transclude: true,
            scope: {
                actions: '=',
                config: '=',
                list: '=',
                onChange: '='
            },
            link: function(scope){
                scope.sortableOptions = {
                    disabled: !scope.actions.priority.change,
                    axis: 'y',
                    stop: function(){
                        if (scope.onChange) {
                            scope.onChange();
                        }
                    }
                };

                var windowHeight = $(window).height();
                scope.gotoAnchor = function(anchor) {
                    var $anchor = $('#'+anchor);
                    setTimeout(function(){
                        if ( windowHeight < ($anchor.offset().top+$anchor.height()-window.pageYOffset) ){
                            $('html,body').animate({
                                scrollTop: $('#'+anchor).offset().top
                            }, 1000);
                        }
                    }, 200);
                };
            }

        };
    });
