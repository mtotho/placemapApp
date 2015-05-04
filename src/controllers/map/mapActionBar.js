'use strict';

angular.module('placemapApp')
    .directive('mapActionBar', function () {
        return {
            templateUrl: 'src/controllers/map/map-action-bar.html?v=1',
            restrict: 'EA',
            scope:{
               //  "question":"="
            },
            require:"^placemapContainer",
            link: function (scope, element, attrs, ctrl) {
                scope.showRightBar = function(bool){
                    ctrl.showRightBar(bool);
                }

            },
            controller: function($scope, MapService,$rootScope, $resource){

                var vm = this;

                $rootScope.$on('placeReady',function(junk, place){
                    vm.place = place;
                    console.log(vm.place);
                });




                vm.steps = {
                    "starting":true,
                    "placing":false,
                    "ranking":false
                }

                $rootScope.$on('markerDrag', function(junk, marker){
                    vm.markerDragged = true;
                });



                vm.getStarted = function(){
                    MapService.showPointer(true);

                    vm.steps.starting = false;
                    vm.steps.placing = true;

                }

                vm.confirmPlacement = function(){
                    MapService.pointer.toggleAnimation(false);
                    MapService.pointer.options.draggable = false;
                    vm.steps.placing = false;
                    vm.steps.ranking = true;

                    $scope.showRightBar(true);

                };



                $rootScope.$on('selectLocation', function(){
                    MapService.pointer.toggleAnimation(true);
                    MapService.pointer.options.draggable = true;
                    vm.steps.placing = true;
                    vm.steps.ranking = false;

                    $scope.showRightBar(false);
                });


            },//end controller,
            controllerAs: 'vm'
        };
    });