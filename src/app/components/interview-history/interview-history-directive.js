angular.module('knowledgeList').directive('interviewHistory',
  function(){
    'use strict';

    return {
      restrict: 'E',
      templateUrl: '/components/interview-history/interview-history-template.html',
      replace: true,
      transclude: true,
      scope: {
        interviewHistory: '='
      }
    };
  });
