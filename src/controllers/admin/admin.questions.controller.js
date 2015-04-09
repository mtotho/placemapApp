'use strict';

angular.module('placemapApp')
    .controller('AdminQuestionsCtrl', function ($scope, $resource, $state) {
        var vm=this;

        var QuestionSet = $resource('/api/v1/questionsets/:id',null,{
            'update': {method:'PUT'}

        });
        var Question = $resource('/api/v1/questions');

        vm.selectedQS = null;
        vm.questionsets=[];
        vm.questions=[];
        vm.newQS = {
            name:""
        };
        vm.newQuestion  = new Question();

        QuestionSet.query(function(data){
            vm.questionsets = data;

            if(vm.questionsets.length>0){
               // vm.selectedQS =data[0];
            }
            console.log(data);
        });
        Question.query(function(data){
            vm.questions = data;
        });

        $scope.$watch('vm.selectedQS',function(data){
            if(vm.selectedQS !== null){

            }
        });
        $scope.createSet = function(form){

            if(form.$valid) {
                var qs = new QuestionSet(vm.newQS);

                qs.$save(function(data){
                    console.log(data);
                });
            }
        }

        $scope.createQuestion = function(form){
            if(form.$valid) {
                var q= new Question(vm.newQuestion);

                q.$save(function(data){
                    console.log(data);

                    vm.questions.push(data);
                    vm.newQuestion = new Question();
                });
            }

        }

        vm.addQuestionToSet = function(question){
            if(vm.selectedQS !== null){
                if(question._id){
                    question._id = undefined;
                }
                vm.selectedQS.questions.push(question);
            }
        }

        vm.saveQS = function(){
            if(vm.selectedQS !== null){
                console.log(vm.selectedQS);
                QuestionSet.update({id:vm.selectedQS._id}, vm.selectedQS, function(result){
                    console.log(result);
                });

            }

        }

        function Question(){
            this.name = "";
            this.text = "";
            this.type = "shortanswer";
            this.tags = [];
            this.opts = [];

        }
        //vm.places = null;
        //
        //Questions.query(function(places){
        //    console.log(places);
        //    vm.places = places;
        //});
        //

    });

