describe('View layout controller', function(){
    'use strict';

    beforeEach(module('knowledgeList'));

    var $controller,
        $q,
        $rootScope,
        $scope,
        $modal,
        config,
        userData,
        usersRepository;

    beforeEach(inject(function(_$controller_, _$q_, _$rootScope_, _$state_){
        $controller = _$controller_;
        $q = _$q_;
        $rootScope = _$rootScope_;
        $scope = $rootScope.$new();
        $modal = {
            open: sinon.spy()
        };

        config = {};
        userData = {
            id: 1,
            first_name: 'First name',
            last_name: 'Last name',
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
            }]
        };

        var $stateParams = {
            userId: 1
        };

        usersRepository = {
            getUser: function(){
                return {
                    then: function(cb){
                        if (cb) {
                            cb(userData);
                        }
                    }
                };
            },
            saveUser: function(){

            }
        };

        $controller('ViewLayoutCtrl', {
            $scope: $scope,
            $state: _$state_,
            $stateParams: $stateParams,
            usersRepository: usersRepository,
            config: config,
            $modal: $modal
        });

    }));

    it('should init user data', function(){
        $scope.userData.should.be.eql(userData);
    });

    it('should save changed goals', function(){
        var saveUserSpy = sinon.spy(usersRepository, 'saveUser');

        $scope.onGoalsChange();

        saveUserSpy.withArgs(userData).calledOnce.should.be.true;
    });

    it('should save user data if uploaded content is valid', function(){
        var content = angular.toJson(userData);
        var saveUserSpy = sinon.spy(usersRepository, 'saveUser');

        $scope.onFileUpload(content);

        saveUserSpy.withArgs(userData).calledOnce.should.be.true;
    });

    it('should not save user data if uploaded content is not valid', function(){
        var content = '';
        var saveUserSpy = sinon.spy(usersRepository, 'saveUser');

        $scope.onFileUpload(content);

        saveUserSpy.called.should.be.false;
    });

    it('should show error modal if uploaded content is not valid', function(){
        var content = '';

        $scope.onFileUpload(content);

        $modal.open.calledOnce.should.be.true;
    });

});