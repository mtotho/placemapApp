'use strict';

angular.module('placemapApp').factory('QuestionSetService', function($rootScope,$filter, $resource) {

    this.questionset = null;

    var QuestionSet = $resource('/api/v1/questionsets/:id',null,{
        'update': {method:'PUT'}
    });

    var setSelected = function(qs){
        this.questionset = qs;
        $rootScope.$broadcast('qsUpdated', qs);
    }

    var addQuestion = function(question){
        if(this.questionset){
            this.questionset.questions.push(question);
            commit(this.questionset);
        }


    }
    var getQuestions = function(){
        if(this.questionset){
            return this.questionset.questions;
        }else{
            return null;
        }
    }

    var removeQuestion = function(question){
        var qindex = $filter('getIndexByProp')(this.questionset.questions, '_id', question._id);

        if(qindex !== null){

            this.questionset.questions.splice(qindex,1);
            commit(this.questionset);
        }

    }

    var commit = function(qs){
        if(qs){
            console.log(qs);
            //var id = this.question_set._id;
            QuestionSet.update({id:qs._id}, qs, function(result){
                console.log(result);

                $rootScope.$broadcast('qsUpdated', qs);
            });

        }

    }

    return {
        addQuestion:addQuestion,
        getQuestions:getQuestions,
        setSelected:setSelected,
        removeQuestion:removeQuestion,
        commit:commit

    };
});
