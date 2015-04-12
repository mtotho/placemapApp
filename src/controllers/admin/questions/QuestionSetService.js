'use strict';

angular.module('placemapApp').factory('QuestionSetService', function($rootScope, $resource) {

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
        commit:commit

    };
});
