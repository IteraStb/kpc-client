angular.
    module('knowledgeList').
    directive('fileUploadBtn', function(){
        'use strict';

        return {
            templateUrl: '/components/file-upload-btn/file-upload-btn-template.html',
            restrict: 'AE',
            scope: {
                onFileLoaded: '='
            },
            link: function(scope){
                scope.onFileUpload = function(element){
                    var file = element.files[0];
                    var reader = new FileReader();
                    reader.onload = function(event) {
                        var contents = event.target.result;
                        scope.$apply(function(){
                            if (scope.onFileLoaded){
                                scope.onFileLoaded(contents);
                            }
                        });
                    };
                    reader.readAsText(file);                    
                };
            }
        };
    });