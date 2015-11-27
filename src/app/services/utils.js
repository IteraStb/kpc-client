angular.
    module('knowledgeList').
    service('utils', function(){
                'use strict';

                /* --- validation --- */

                this.validatePassword = function(pass){
                    return pass && pass.length>7 && pass.match(/[A-Z]/) && pass.match(/\d/);
                };

                /* --- errors --- */

                var errorFields = {
                    password: 'Password',
                    password_new: 'New password',
                    password_old: 'Old password',
                    user: 'User'
                };

                var errorCodes = {
                    WRONG_FORMAT: 'has wrong format',
                    WRONG: 'is wrong'
                };

                this.getErrorMsg = function(error){
                    return Object.keys(error)
                        .reduce(function(msg, field){
                            var code = error[field];
                            var errField = errorFields[field] || field;
                            var errCode  = errorCodes[code] || code;
                            return msg+errField+' '+errCode+'. ';
                        }, '');
                };
            });
