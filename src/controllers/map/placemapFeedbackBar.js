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
            controller: function($scope, MapService,Resources, $mdDialog, $rootScope){

                var vm = this;

                vm.currentQuestion = null;
                vm.questionIndex = 0;
                vm.questionCount = 0;
                vm.questionsComplete = false;
                vm.responses = [];

                vm.goBack = function(){
                    $rootScope.$broadcast('selectLocation');
                    vm.questionsComplete = false;
                }

                $scope.$watch('place',function(){
                    if(!angular.isUndefinedOrNull($scope.place)){
                        vm.place = $scope.place;
                        console.log(vm.place);
                        //vm.newFeedback.place = vm.place._id;
                        vm.questionCount = vm.place.question_set.questions.length;

                        if(vm.questionCount > 0){
                            vm.responses = new ResponseObject(vm.place.question_set.questions);
                           // console.log(vm.responses);
                            vm.currentQuestion = vm.place.question_set.questions[0];

                        }
                    }
                });

                function ResponseObject(questions){
                    var response = [];

                    for(var i=0; i<questions.length; i++){
                        response[questions[i]._id] = {
                            question:questions[i]._id,
                            response_text:""
                        }
                    }

                    return response;
                }

                vm.nextQuestion = function(ev){
                    if(vm.questionIndex < vm.questionCount){


                        if((vm.currentQuestion.is_required && vm.responses[vm.currentQuestion._id].response_text!=="") || !vm.currentQuestion.is_required){
                             vm.questionIndex ++;
                             vm.currentQuestion = vm.place.question_set.questions[vm.questionIndex];
                         }else{
                             $mdDialog.show(
                                 $mdDialog.alert()
                                     .parent(angular.element(document.body))
                                     .title('Oops')
                                     .content('Please complete this question before moving on')
                                     .ariaLabel('Alert Dialog')
                                     .ok('Got it!')
                                     .targetEvent(ev)
                             );
                         }

                    }
                };

                vm.previousQuestion = function(){
                    if(vm.questionIndex > 0){
                        vm.questionIndex --;
                        vm.currentQuestion = vm.place.question_set.questions[vm.questionIndex];
                    }
                };


                vm.submitFeedback = function(ev){

                    if((vm.currentQuestion.is_required && vm.responses[vm.currentQuestion._id].response_text!=="") || !vm.currentQuestion.is_required){
                        var feedback = {
                            place:vm.place._id,
                            responses: []
                        };

                        for(var r in vm.responses){
                            console.log(r);
                            feedback.responses.push(vm.responses[r]);
                        }
                        var Feedback = new Resources.feedback(feedback);

                        Feedback.$save(function(result){
                            console.log(result);

                            vm.questionIndex = 0;
                            vm.responses = [];
                            vm.currentQuestion = vm.place.question_set.questions[vm.questionIndex];
                            vm.questionsComplete = true;
                        });
                    }else{
                        $mdDialog.show(
                            $mdDialog.alert()
                                .parent(angular.element(document.body))
                                .title('Oops')
                                .content('Please complete this question before moving on')
                                .ariaLabel('Alert Dialog')
                                .ok('Got it!')
                                .targetEvent(ev)
                        );
                    }

                };

               // size_content();
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
  //  size_content()
});