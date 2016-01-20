angular.
module('knowledgeList')
  .factory('menuResolver',
    ['$http',
      '$q',
      'authorization',
        function ($http,
                  $q,
                  authorization) {
          'use strict';
          var menu,
              prevAuthRole;

          return function () {
            var defer = $q.defer(),
            authRole = authorization.getUserRole();
            console.log(authRole);

            if (authRole === prevAuthRole) {
              defer.resolve(menu);
            } else {
              $http.get('/api/menu', {params: {role: authRole}})
                .then(function (_menu_) {
                  prevAuthRole = authRole;
                  menu = _menu_.data;
                  defer.resolve(menu);
                });
            }
            return defer.promise;
          };
  }]);
