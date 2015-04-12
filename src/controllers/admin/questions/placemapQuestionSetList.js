'use strict';

angular.module('placemapApp')
    .directive('placemapQuestionSetList', function () {
        return {
            templateUrl: 'src/controllers/admin/questions/placemap-question-set-list.html',
            restrict: 'EA',
            scope:{

            },
            //require:"^legacyToolExplorer",
            link: function (scope, element, attrs, ctrl) {

            },
            controller: function($scope, $resource, QuestionSetService){

                var QuestionSet = $resource('/api/v1/questionsets/:id',null,{
                    'update': {method:'PUT'}
                });

                $scope.newQS = new QuestionSetModel();

                $scope.questionsets = [];

                $scope.selectedSet = null;


                QuestionSet.query(function(data){
                    $scope.questionsets = data;

                    console.log(data);

                });

                $scope.selectSet = function(qs){
                    $scope.selectedSet = qs;
                    QuestionSetService.setSelected(qs);


                }
                $scope.createSet = function(form){

                    if(form.$valid) {
                        var qs = new QuestionSet($scope.newQS);

                        qs.$save(function(data){
                            console.log(data);

                            $scope.questionsets.push(data);
                            $scope.newQS = new QuestionSetModel();
                        });
                    }
                }


                $scope.saveQS = function(){
                    if(vm.selectedQS !== null){
                        console.log(vm.selectedQS);
                        QuestionSet.update({id:vm.selectedQS._id}, vm.selectedQS, function(result){
                            console.log(result);
                        });

                    }
                }

                function QuestionSetModel(){
                    this.name = "";
                    this.questions = [];
                }

            }//end controller
        };
    });