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

                scope.editComplete = function(){
                    ctrl.editComplete();
                }
            },
            controller: function($scope, $resource){
                var Question =  $resource('/api/v1/questions/:id',null,{
                    'update': {method:'PUT'}
                });


                $scope.isNew = true;

                if(!angular.isUndefinedOrNull($scope.question._id)){

                    $scope.isNew = false;
                }

                $scope.removeOptFromQuestion = function(opt){
                    console.log( $scope.question);
                    var index = -1;

                    for(var i = 0; i < $scope.question.opts.length; i++){
                        if($scope.question.opts[i]._id===opt._id){
                            index = i;
                            break;
                        }
                    };

                    if(index>0){
                        $scope.question.opts.splice(index, 1);
                    }
                }

                $scope.newOption = "";

                $scope.addOption = function(){

                    if($scope.newOption !== ""){
                        $scope.question.opts.push({text:$scope.newOption});
                        $scope.newOption = "";
                    }

                }

                $scope.cancelEdit = function(){
                    $scope.editComplete();
                }
                $scope.saveQuestion = function(form){

                    if(form.$valid) {
                        if(!$scope.question.hasOwnProperty("is_required")){
                            $scope.question.is_required = false;
                        }
                        if ($scope.isNew) {

                            var q = new Question($scope.question);

                            q.$save(function(data){
                                console.log(data);

                                $scope.pushQuestion(data);
                                //vm.questions.push(data);
                                //vm.newQuestion = new Question();
                            });

                        } else {

                            Question.update({id: $scope.question._id}, $scope.question, function (result) {

                                $scope.editComplete();
                            });

                        }
                    }
                }





            }//end controller
        };
    });