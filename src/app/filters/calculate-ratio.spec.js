describe('Calculate ratio filter', function(){
    'use strict';

    beforeEach(module('knowledgeList'));

    var $filter, list;

    beforeEach(inject(function(_$filter_){
        $filter = _$filter_;

        list = [{
            name: 'name1',
            boolProp: true
        },{
            name: 'name2',
            boolProp: true
        },{
            name: 'name3',
            boolProp: true
        },{
            name: 'name4',
            boolProp: false
        },{
            name: 'name5',
            boolProp: false
        }];

    }));

    it('should return ratio between quantity of elements that has property set to true to the total quantity', function(){
        var ratio = 3/5;
        var prop  = 'boolProp';
        $filter('calculateRatio')(list, prop).should.be.equal(ratio);
    });

    it('should return 0 if no property is passed to filter', function(){
        var ratio = 0;
        $filter('calculateRatio')(list).should.be.equal(ratio);
    });

    it('should return 0 if no list is passed to filter', function(){
        var ratio = 0;
        $filter('calculateRatio')().should.be.equal(ratio);
    });

    it('should return 0 if list passed to filter is object', function(){
        var ratio = 0;
        var listObject = {};
        $filter('calculateRatio')(listObject).should.be.equal(ratio);
    });

});