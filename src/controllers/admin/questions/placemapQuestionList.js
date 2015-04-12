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
            controller: function($scope, $resource, QuestionSetService){
                var vm = this;

                function QuestionModel(){
                    this.name = "";
                    this.text = "";
                    this.type = "shortanswer";
                    this.tags = [];
                    this.opts = [];

                }
                $scope.editQuestion = null;

                this.setEditQuestion = function(question){
                    $scope.editQuestion = question;
                }
                this.editComplete = function(){

                    $scope.editQuestion = null;


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

                console.log($scope.editQuestion);
                this.pushQuestion = function(question){
                    $scope.questions.push(question);
                    $scope.showQuestionCreateCard = false;
                    $scope.newQuestion = new QuestionModel();
                }

                $scope.selectedSet = null;

                $scope.$on('setSelected',function(event,set){
                    $scope.selectedSet = set;

                });



            }//end controller
        };
    });