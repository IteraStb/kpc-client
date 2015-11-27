describe('Prioritize filter', function(){
    'use strict';

    beforeEach(module('knowledgeList'));

    var $filter, topics, config;

    beforeEach(inject(function(_$filter_){
        $filter = _$filter_;

        topics = [{}, {}, {}, {}, {}, {}, {}, {}];
        config = {
            should : {
                count : 3
            },
            could : {
                count : 2
            }
        };
    }));

    it('should set priorities to topics according to config', function(){
        var priorityPositions = ['should', 'should', 'should', 'could', 'could', 'could-not', 'could-not', 'could-not'];

        $filter('prioritize')(topics, config).forEach(function(item, index){
            item.priority.should.be.equal(priorityPositions[index]);
        });
    });

    it('should return initial topics list if no config is passed to filter', function(){
        $filter('prioritize')(topics).should.be.eql(topics);
    });

    it('should set "could-not" status to topics if wrong config', function(){
        var priorityPositions = ['should', 'should', 'should', 'could-not', 'could-not', 'could-not', 'could-not', 'could-not'];
        config.could.count = undefined;
        $filter('prioritize')(topics, config).forEach(function(item, index){
            item.priority.should.be.equal(priorityPositions[index]);
        });
    });
});