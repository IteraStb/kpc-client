angular.
module('knowledgeList').
factory('usersRepository', ['$http', '$q', 'utils', function ($http, $q, utils) {
  'use strict';

  //gets users to display them in the list
  function getUsers() {
    var defer = $q.defer();

    $http.get('/api/users')
      .then(function (usersResponse) {
        defer.resolve(usersResponse.data);
      }, function (error) {
        defer.reject(error);
    });

    return defer.promise;
  }

  function getUser(userId) {
    var defer = $q.defer(),
        user;

    $http.get('/api/users/show/' + userId).then(function (response) {
      user = response.data;
      defer.resolve(user);

    }, function (error) {
      defer.reject(error);
    });

    return defer.promise;
  }

  //todo refactor $http.post to use then() promise method
  function changePassword(id, passwords) {
    var defer = $q.defer();

    if (!utils.validatePassword(passwords.password_new)) {
      defer.reject({error: {password_new: 'WRONG_FORMAT'}});
    } else {
      $http.post('/api/users/change_password/' + id, passwords)
        .success(function (resp) {
          if (resp.error) {
            defer.reject(resp);

          } else {
            defer.resolve(resp);
          }
        })
        .error(function (error) {
          defer.reject(error);
      });
    }

    return defer.promise;
  }

  return {
    getUser: getUser,
    getUsers: getUsers,
    changePassword: changePassword
  };
}]);
