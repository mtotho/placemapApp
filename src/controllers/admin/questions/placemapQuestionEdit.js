'use strict';

angular.module('placemapApp')
    .directive('placemapQuestionEdit', function () {
        return {
            templateUrl: 'src/controllers/admin/questions/placemap-question-edit.html?v=1',
            restrict: 'EA',
            scope:{
                "question":"="
            },
            require:"^placemapQuestionList",
            link: function (scope, element, attrs, ctrl) {
                scope.pushQuestion = function(question){
                    ctrl.pushQuestion(question);
                }
            },
            controller: function($scope, $resource){
                var Question =  $resource('/api/v1/questions/:id',null,{
                    'update': {method:'PUT'}
                });

                var isNew = true;
                if(!angular.isUndefinedOrNull($scope.question._id)){
                    isNew = false;
                }

                $scope.newOption = "";

                $scope.addOption = function(){

                    if($scope.newOption !== ""){
                        $scope.question.opts.push({text:$scope.newOption});
                        $scope.newOption = "";
                    }

                }


                $scope.saveQuestion = function(form){

                    if(form.$valid) {
                        if (isNew) {

                            var q = new Question($scope.question);

                            q.$save(function(data){
                                console.log(data);

                                $scope.pushQuestion(data);
                                //vm.questions.push(data);
                                //vm.newQuestion = new Question();
                            });

                        } else {

                            Question.update({id: $scope.question._id}, vm.question, function (result) {
                                console.log(result);
                            });

                        }
                    }
                }





            }//end controller
        };
    });