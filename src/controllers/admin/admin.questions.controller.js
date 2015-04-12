'use strict';

angular.module('placemapApp')
    .controller('AdminQuestionsCtrl', function ($scope, $resource, $mdBottomSheet, $state) {
        var vm=this;

        var QuestionSet = $resource('/api/v1/questionsets/:id',null,{
            'update': {method:'PUT'}

        });


        vm.selectedQS = null;
        vm.questionsets=[];
        vm.questions=[];
        vm.newQS = {
            name:""
        };

        QuestionSet.query(function(data){
            vm.questionsets = data;

            if(vm.questionsets.length>0){
               // vm.selectedQS =data[0];
            }
            console.log(data);
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


        //
        //vm.addEditQuestion = function($event, question) {
        //    $scope.alert = '';
        //    $mdBottomSheet.show({
        //        templateUrl: 'src/controllers/admin/question.edit.html',
        //        controller: function(){
        //
        //            if(angular.isUndefinedOrNull(question)){
        //                var Question = $resource('/api/v1/questions');
        //                console.log("dd");
        //                $scope.question = new Question();
        //
        //                $scope.createQuestion = function(form){
        //                    if(form.$valid) {
        //                        var q= new Question($scope.question);
        //
        //                        q.$save(function(data){
        //                            console.log(data);
        //
        //                            vm.questions.push(data);
        //                            vm.newQuestion = new Question();
        //                        });
        //                    }
        //
        //                }
        //            }
        //
        //        },
        //        targetEvent: $event
        //    }).then(function(clickedItem) {
        //        $scope.alert = clickedItem.name + ' clicked!';
        //    });
        //};
        //vm.places = null;
        //
        //Questions.query(function(places){
        //    console.log(places);
        //    vm.places = places;
        //});
        //

    });

