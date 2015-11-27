describe('Convert to boolean value filter', function(){
    'use strict';

    beforeEach(module('knowledgeList'));

    var $filter;

    beforeEach(inject(function(_$filter_){
        $filter = _$filter_;
    }));

    it('should convert undefined to false', function(){
        $filter('toBoolean')(undefined).should.be.equal(false);
    });

    it('should convert "undefined" string to false', function(){
        $filter('toBoolean')('undefined').should.be.equal(false);
    });

    it('should convert false to false', function(){
        $filter('toBoolean')(false).should.be.equal(false);
    });

    it('should convert "false" string to false', function(){
        $filter('toBoolean')('false').should.be.equal(false);
    });

    it('should convert null to false', function(){
        $filter('toBoolean')(null).should.be.equal(false);
    });

    it('should convert "null" string to false', function(){
        $filter('toBoolean')('null').should.be.equal(false);
    });

    it('should convert 0 number to false', function(){
        $filter('toBoolean')(0).should.be.equal(false);
    });

    it('should convert "0" string to false', function(){
        $filter('toBoolean')('0').should.be.equal(false);
    });

    it('should convert zero-length string to false', function(){
        $filter('toBoolean')('').should.be.equal(false);
    });

    it('should convert true number to true', function(){
        $filter('toBoolean')(true).should.be.equal(true);
    });

    it('should convert "true" string to true', function(){
        $filter('toBoolean')('true').should.be.equal(true);
    });

    it('should convert non-zero number to true', function(){
        $filter('toBoolean')(-1).should.be.equal(true);
        $filter('toBoolean')(1).should.be.equal(true);
    });

    it('should convert any but no non-zero, "false", "null", "undefined" string to true', function(){
        $filter('toBoolean')('a').should.be.equal(true);
    });

});