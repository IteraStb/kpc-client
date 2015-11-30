describe('Login controller', function(){
    'use strict';

    beforeEach(module('knowledgeList'));

    var $controller,
        $rootScope,
        $scope,
        $state,
        authorization,
        successfulThen,
        failedThen;

    beforeEach(inject(function(_$controller_, _$rootScope_, _$state_){
        $controller = _$controller_;
        $rootScope = _$rootScope_;
        $state = _$state_;
        $scope = $rootScope.$new();

        successfulThen = function(successCb){
            if (successCb) {
                successCb();
            }
        };

        failedThen = function(successCb, errorCb){
            if (errorCb) {
                errorCb();
            }
        };


        authorization = {
            getUserId: sinon.stub().returns(1),
            authorize: function(){
                return {
                    then: successfulThen
                };
            }
        };

        $controller('LoginCtrl', {
            $scope: $scope,
            $state: $state,
            authorization: authorization
        });

    }));

    it('should call authorization function on submit', function(){
        var loginData = {};
        var authorizationSpy = sinon.spy(authorization, 'authorize');

        $scope.onSubmit(loginData);

        authorizationSpy.calledOnce.should.be.true;
    });

    it('should redirect to the user\'s knowledge list if authorization was successful', function(){
        var loginData = {};
        var authorizationStub = sinon.
            stub(authorization, 'authorize').
            returns({then: successfulThen});

        var $stateSpy = sinon.spy($state, 'go');

        $scope.onSubmit(loginData);

        $stateSpy.calledWith('view.knowledge_list', {userId: 1}).should.be.true;
    });

});
