describe('Get recent log filter', function(){
    'use strict';

    beforeEach(module('knowledgeList'));

    var $filter, topic;

    beforeEach(inject(function(_$filter_){
        $filter = _$filter_;

        topic = {
            log: [{id: 'first'}, {id: 'middle'}, {id: 'last'}]
        };

    }));

    it('should return last log object', function(){
        $filter('getRecentLogEntry')(topic).should.be.equal(topic.log.pop());
    });

});