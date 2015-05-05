'use strict';

angular.module('placemapApp')
    .directive('placemapFeedbackBar', function () {
        return {
            templateUrl: 'src/controllers/map/placemap-feedback-bar.html?v=1',
            restrict: 'EA',
            scope:{
                "place":"="
            },
            require:"^placemapContainer",
            link: function (scope, element, attrs, ctrl) {
                scope.showRightBar = function(){
                    ctrl.showRightBar();
                }

            },
            controller: function($scope, MapService,$rootScope){

                var vm = this;

                vm.currentQuestion = null;
                vm.questionIndex = 0;
                vm.questionCount = 0;
                vm.questionsComplete = false;

                vm.goBack = function(){
                    $rootScope.$broadcast('selectLocation');
                    vm.questionsComplete = false;
                }

                $scope.$watch('place',function(){
                    if(!angular.isUndefinedOrNull($scope.place)){
                        vm.place = $scope.place;
                        console.log(vm.place);

                        vm.questionCount = vm.place.question_set.questions.length;

                        if(vm.questionCount > 0){
                            vm.currentQuestion = vm.place.question_set.questions[0];

                        }
                    }
                });


                vm.nextQuestion = function(){
                    if(vm.questionIndex < vm.questionCount){
                        vm.questionIndex ++;
                        vm.currentQuestion = vm.place.question_set.questions[vm.questionIndex];
                    }
                };

                vm.previousQuestion = function(){
                    if(vm.questionIndex > 0){
                        vm.questionIndex --;
                        vm.currentQuestion = vm.place.question_set.questions[vm.questionIndex];
                    }
                };


                vm.submitFeedback = function(){

                    vm.questionIndex = 0;

                    vm.currentQuestion = vm.place.question_set.questions[vm.questionIndex];
                    vm.questionsComplete = true;



                };

                size_content();
            },//end controller,
            controllerAs: 'vm'
        };
    });

function size_content(){

    var headerheight=$("#header").outerHeight();
    var mapbarheight=$("map-action-bar md-toolbar").outerHeight();
    var windowheight=$(window).outerHeight();

    var targetheight = windowheight - (headerheight + mapbarheight + 100 + 16 + 48);



    $("#feedback-question-content").css('height',targetheight+'px');

}
$(window).resize(function(){
    size_content()
});