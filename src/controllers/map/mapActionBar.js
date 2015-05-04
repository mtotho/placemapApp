'use strict';

angular.module('placemapApp')
    .directive('mapActionBar', function () {
        return {
            templateUrl: 'src/controllers/map/map-action-bar.html?v=1',
            restrict: 'EA',
            scope:{
               //  "question":"="
            },
            //require:"^placemapQuestionList",
            link: function (scope, element, attrs) {

            },
            controller: function($scope, MapService,$rootScope, $resource){

                var vm = this;

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
                    MapService.pointer.options.animation = null;
                    vm.steps.placing = false;
                    vm.steps.ranking = true;


                }


            },//end controller,
            controllerAs: 'vm'
        };
    });