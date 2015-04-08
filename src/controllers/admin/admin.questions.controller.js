'use strict';

angular.module('placemapApp')
    .controller('AdminQuestionsCtrl', function ($scope, $resource, $state) {
        var vm=this;

        var QuestionSet = $resource('/api/v1/questionsets');
        var Question = $resource('/api/v1/questions');

        vm.questionsets=[];
        vm.questions=[];
        vm.newQS = {
            name:""
        };
        vm.newQuestion  = new Question();

        QuestionSet.query(function(data){
            vm.questionsets = data;
        });
        Question.query(function(data){
            vm.questions = data;
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

