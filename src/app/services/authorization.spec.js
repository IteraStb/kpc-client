describe('Authorization service', function(){
    'use strict';


    beforeEach(module('knowledgeList'));

    var $cookieStore, $httpBackend, authorization, $scope;
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

    var adminRights = {
        user: {
            add: true
        },
        knowledge_list: {
            priority: {
                change: true
            },
            todo: {
                add: true,
                remove: true,
                change: true
            }
        }
    };

    beforeEach(inject(function(_authorization_, _$cookieStore_, _$httpBackend_, _$rootScope_){
        $scope = _$rootScope_;

        $cookieStore = _$cookieStore_;

        $cookieStore.remove('authdUserId');
        $cookieStore.remove('authdUserRole');

        $httpBackend = _$httpBackend_;
        $httpBackend.whenGET('data/users_roles.json').respond(users);
        $httpBackend.whenGET('./pages/login/login-template.html').respond('');

        authorization = _authorization_;
    }));


    //*** getUserId ***

    it('should return user\'s authorized id', function(){
        $cookieStore.put('authdUserId', 3);
        authorization.getAuthorizedUserId().should.be.equal(3);
    });


    //*** getUsersDb ***

    it('should return all users list', function(){
        $httpBackend.flush();
        authorization.getUsersDb().should.be.eql(users);
    });


    //*** authorize ***

    it('should authorize user if credentials are correct', function(done){
        var loginData = {
            login: 'login',
            password: 'password'
        };

        $httpBackend.flush();
        authorization.getUsersDb();

        authorization.authorize(loginData).should.eventually.deep.equal({success: 1}).notify(done);

        $scope.$apply();

    });

    it('should throw error if failed to login user', function(){
        var loginData = {
            login: 'login',
            password: 'pas34534w5sword'
        };

        $httpBackend.flush();
        authorization.getUsersDb();

        authorization.authorize(loginData).should.be.rejectedWith({error: 'AUTHORIZATION_FAILED'});

        $scope.$apply();

    });


    //*** getUserRights ***

    it('should return admin rights if authorized user has admin role', function(){
        var loginData = {
            login: 'admin',
            password: 'admin'
        };

        $httpBackend.flush();
        authorization.getUsersDb();

        authorization.authorize(loginData).then(function(){
            authorization.getUserRights().should.be.eql(adminRights);
        });

        $scope.$apply();
    });


    //*** isAuthorized ***

    it('should return true if there is the authenticated user', function(){

        $cookieStore.put('authdUserId', 2);
        authorization.isAuthorized().should.be.true;
    });


    it('should return false if there is no authenticated user', function(){

        authorization.isAuthorized().should.be.false;
    });


    //** isAllowedPage **

    // to be changed and completed with page list

    it('should not allow to go to pages, connected to other user, if the authenticated user is regular', function(){

        $cookieStore.put('authdUserId', 2);
        $cookieStore.put('authdUserRole', 'regular');

        authorization.isAllowedPage('view.knowledge_list', {userId: 1}).should.be.false;
    });

    it('should allow to go to any page if the authenticated user is admin', function(){

        $cookieStore.put('authdUserId', 1);
        $cookieStore.put('authdUserRole', 'admin');

        authorization.isAllowedPage('view.knowledge_list', {userId: 1}).should.be.true;
    });


    //*** logout ***

    it('should logout user (clean cookies user data)', function(){

        $cookieStore.put('authdUserId', 1);
        $cookieStore.put('authdUserRole', 'admin');

        authorization.logout().then(function(){
            (typeof $cookieStore.get('authdUserId')).should.be.equal('undefined');
        });

        $scope.$apply();
    });

});
