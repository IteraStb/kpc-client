angular.module('knowledgeList').directive('interviewItemLog',
  function(){
    'use strict';

    return {
      restrict: 'E',
      templateUrl: '/components/interview/interview-template.html',
      replace: true,
      transclude: true,
      scope: {
        log: '='
      }
    };
  });
