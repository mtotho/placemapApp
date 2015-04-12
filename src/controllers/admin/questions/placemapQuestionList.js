'use strict';

angular.module('placemapApp')
    .directive('placemapQuestionList', function () {
        return {
            templateUrl: 'src/controllers/admin/questions/placemap-question-list.html',
            restrict: 'EA',
            scope:{

            },
            //require:"^legacyToolExplorer",
            link: function (scope, element, attrs, ctrl) {

            },
            controller: function($scope, $resource){
                var vm = this;

                function QuestionModel(){
                    this.name = "";
                    this.text = "";
                    this.type = "shortanswer";
                    this.tags = [];
                    this.opts = [];

                }

                var Question = $resource('/api/v1/questions');
                Question.query(function(data){
                    $scope.questions = data;
                });


                $scope.showQuestionCreateCard = false;
                $scope.newQuestion  = new QuestionModel();
                $scope.toggleCreateQuestionCard = function(){
                    $scope.showQuestionCreateCard = !$scope.showQuestionCreateCard;
                }

                this.pushQuestion = function(question){
                    $scope.questions.push(question);
                    $scope.showQuestionCreateCard = false;
                    $scope.newQuestion = new QuestionModel();
                }

            }//end controller
        };
    });