describe('Todo list directive', function(){
    'use strict';
    beforeEach(module('knowledgeList'));

    var $rootScope, $scope, $compile, formElement, $httpBackend;
    var users = [
        {
            'id': 1,
            'password': 'password',
            'login': 'login',
            'role': 'regular'
        },
        {
            'id': 2,
            'password': 'admin',
            'login': 'admin',
            'role': 'admin'
        }
    ];

    beforeEach(inject(function(_$compile_, _$rootScope_, _$httpBackend_){
        $compile = _$compile_;

        $rootScope = _$rootScope_;
        $scope = $rootScope.$new();

        $scope.onChangeCb = sinon.spy();
        $scope.list = [
            {
                title     : 'Finish reading book',
                completed : 'true'
            },
            {
                title     : 'Kill Bill!',
                completed : 'false'
            },
           {
                title     : 'Lalalalalala',
                completed : 'true'
            },
            {
                title     : 'Very long task to check title if it shows nice in browser... Yey, nothing else to say, but i have to keep writing something. Hope that`s enought.',
                completed : 'false'
            },
           {
                title     : 'Finish ANYTHING!!!',
                completed : 'true'
            },
            {
                title     : 'Kill Bill 2 season!',
                completed : 'false'
            }
        ];

        $httpBackend = _$httpBackend_;
        $httpBackend.whenGET('data/users_roles.json').respond(users);
        $httpBackend.whenGET('./pages/login/login-template.html').respond('');

        formElement = $compile('<todo-list list="list" on-change-cb="onChangeCb" />')($scope);

        $scope.$digest();
    }));

    it('should call callback when click checkbox', function(){
        var checkboxElement = angular.element(formElement.find('li')[3]).find('span')[1];
        angular.element(checkboxElement).triggerHandler('click');
        $scope.onChangeCb.calledOnce.should.be.true;
    });

    it('should move checked item to the end of the list', function(){
        var checkedItem = {
            title     : 'Kill Bill!',
            completed : true
        };
        formElement.isolateScope().onToggleCheck.apply({item: $scope.list[1]});

        var lastInList = $scope.list.pop();
        delete lastInList.$$hashKey;

        lastInList.should.be.eql(checkedItem);
    });

    it('should move unchecked item to the first position in the list', function(){
        var uncheckedItem = {
            title     : 'Finish ANYTHING!!!',
            completed : false
        };
        formElement.isolateScope().onToggleCheck.apply({item: $scope.list[4]});

        var firstInList = $scope.list.shift();
        delete firstInList.$$hashKey;

        firstInList.should.be.eql(uncheckedItem);
    });
});