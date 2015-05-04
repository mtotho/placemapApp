'use strict';

angular.module('placemapApp')
    .directive('placemapFeedbackBar', function () {
        return {
            templateUrl: 'src/controllers/map/placemap-feedback-bar.html?v=1',
            restrict: 'EA',
            scope:{

            },
            require:"^placemapContainer",
            link: function (scope, element, attrs, ctrl) {
                scope.showRightBar = function(){
                    ctrl.showRightBar();
                }

            },
            controller: function($scope, MapService,$rootScope){

                var vm = this;

                vm.goBack = function(){
                    $rootScope.$broadcast('selectLocation');
                }


                $scope.$on('placeReady',function(junk, place){
                    vm.place = place;
                    console.log(vm.place);
                });
                console.log(vm.place);

            },//end controller,
            controllerAs: 'vm'
        };
    });