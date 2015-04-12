'use strict';

angular.module('placemapApp').factory('QuestionSetService', function($rootScope, $resource) {

    this.questionset = null;

    var QuestionSet = $resource('/api/v1/questionsets/:id',null,{
        'update': {method:'PUT'}
    });

    var setSelected = function(qs){
        this.questionset = qs;
        $rootScope.$broadcast('setSelected', qs);
    }

    var addQuestion = function(question){
        if(this.questionset){
            this.questionset.questions.push(question);
        }

        if(this.questionset !== null){

            QuestionSet.update({id:this.questionset._id}, this.questionset, function(result){
                console.log(result);
            });
        }
    }
    var getQuestions = function(){
        if(this.questionset){
            return this.questionset.questions;
        }else{
            return null;
        }
    }

    return {
        addQuestion:addQuestion,
        getQuestions:getQuestions,
        setSelected:setSelected

    };
});
