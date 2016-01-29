angular.module('knowledgeList').directive('interviewItemLog',
  function(){
    'use strict';

    return {
      restrict: 'E',
      templateUrl: '/components/interview-item-log/interview-item-log-template.html',
      replace: true,
      transclude: true,
      scope: {
        log: '='
      }
    };
  });
