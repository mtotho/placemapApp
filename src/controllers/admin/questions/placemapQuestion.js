'use strict';

angular.module('placemapApp')
    .directive('placemapQuestion', function () {
        return {
            templateUrl: 'src/controllers/admin/questions/placemap-question.html',
            restrict: 'EA',
            scope:{
                "question":"=",
                "selectedSet":"="
            },
            require:"^placemapQuestionList",
            link: function (scope, element, attrs, ctrl) {
                scope.setEditQuestion= function(question){
                    ctrl.setEditQuestion(question);
                };
            },
            controller: function($scope,$filter, QuestionSetService){
                //$scope.selectedSet= null;
                $scope.inSet = false;


                $scope.$on('qsUpdated',function(event,set){
                    $scope.inSet = false;
                    $scope.selectedSet = set;

                    console.log(set);
                    if(set!==null){
                        var inSet = $filter('getByProp')(set.questions, 'name', $scope.question.name);
                        if(inSet !== null){
                            $scope.inSet = true;
                        }
                    }
                });

                $scope.setEditQuestion = function(){

                }

                $scope.addQuestionToSet = function(question){
                    QuestionSetService.addQuestion(question);
                    $scope.inSet = true;
                }

            }//end controller
        };
    });