angular.module('knowledgeList').
controller('KnowledgeListItemCtrl',
  [ '$scope',
    '$state',
    'usersRepository',
    '$stateParams',
    'authorization',
    'config',

    function ($scope,
              $state,
              $stateParams,
              usersRepository,
              authorization,
              config) {
      'use strict';
      var userId = $stateParams.userId,

      //todo Remove this mock after backend is added to retrieve knowledge list from DB
        knowledgeListMock = {
          knowledge_list: [{
            'id': 'jasmine',
            'title': 'Jasmine',
            'area': 'fremework/lib',
            'log': [
              {
                'date': '2015-01-15T15:16:58.366Z',
                'score': '7',
                'goals': [
                  {
                    'title': 'Finish reading book',
                    'completed': 'false'
                  },
                  {
                    'title': 'Kill Bill!',
                    'completed': 'true'
                  }
                ]
              },
              {
                'date': '2015-01-15T15:16:58.366Z',
                'score': '7',
                'goals': [
                  {
                    'title': 'Finish reading book',
                    'completed': 'false'
                  },
                  {
                    'title': 'Kill Bill!',
                    'completed': 'false'
                  }
                ]
              }
            ]
          },
            {
              'id': 'Angular',
              'title': 'Angular',
              'area': 'fremework',
              'log': [
                {
                  'date': '2015-11-15T15:16:58.366Z',
                  'score': '4',
                  'goals': [
                    {
                      'title': 'Finish reading book',
                      'completed': 'false'
                    },
                    {
                      'title': 'Feed a cat!',
                      'completed': 'false'
                    }
                  ]
                },
                {
                  'date': '2015-11-23T15:16:58.366Z',
                  'score': '7',
                  'goals': [
                    {
                      'title': 'Finish reading book',
                      'completed': 'false'
                    },
                    {
                      'title': 'Feed a cat!',
                      'completed': 'false'
                    }
                  ]
                }
              ]
            },
            {
              'id': 'Git',
              'title': 'Git',
              'area': 'version control',
              'log': [
                {
                  'date': '2015-11-15T15:16:58.366Z',
                  'score': '4',
                  'goals': [
                    {
                      'title': 'Finish reading book',
                      'completed': 'false'
                    },
                    {
                      'title': 'Feed a cat!',
                      'completed': 'false'
                    }
                  ]
                },
                {
                  'date': '2015-11-23T15:16:58.366Z',
                  'score': '5',
                  'goals': [
                    {
                      'title': 'Finish reading book',
                      'completed': 'false'
                    },
                    {
                      'title': 'Feed a cat!',
                      'completed': 'false'
                    }
                  ]
                }
              ]
            }
          ]
        },
        userDataMerged = {};

      $scope.rights = authorization.getUserRights();
      $scope.config = config;

      //merge user object with knowledge mock data
      //usersRepository.getUser(userId).then(function (userData) {
      //  userDataMerged = angular.extend(userData, knowledgeListMock);
      //  $scope.userData = userDataMerged;
      //});
    }]);