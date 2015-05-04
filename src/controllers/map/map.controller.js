'use strict';

angular.module('placemapApp')
    .controller('MapCtrl', function ($scope,$stateParams) {
        var vm=this;

        //var Place = $resource('/api/places');
        vm.placeName = $stateParams.name;
        vm.placeid = $stateParams.placeId;


        //
        //MapService.getPlace(vm.placeId,function(place){
        //    console.log(place);
        //
        //$scope.map = MapService.map;
        //$scope.pointer = MapService.pointer;


        ////Size map height after it loadss
        //$scope.$on('$viewContentLoaded', function () {
        //  map_resize();
        //});


    }).directive('placemapContainer', function () {
        return {
            templateUrl: 'src/controllers/map/placemap-container.html?v=1',
            restrict: 'EA',
            scope:{
                  "placeid":"="
            },
            //require:"^placemapQuestionList",
            link: function (scope, element, attrs) {

            },
            controller: function($scope, MapService,$rootScope, uiGmapGoogleMapApi){
                var vm = this;

                //vm.mapready = false;

               // $rootScope.$on('mapready',function(){

               // });
                vm.showSideBar =false;
                $scope.map = MapService.map;
                $scope.pointer = MapService.pointer;

                angular.map_resize();

                MapService.getPlace($scope.placeid,function(place) {
                    console.log(place);

                    $scope.map = MapService.map;
                    $scope.pointer = MapService.pointer;


                      //  vm.mapready = true;


                    console.log($scope.map);

                    //Size map height after it loadss

                });


                vm.showRightBar = function (bool){
                    vm.showSideBar = bool;
                }

            },//end controller,
            controllerAs: 'vm'
        };
});






angular.map_resize = function(offset){
    var headerheight=$("#header").outerHeight();
    var mapbarheight=$("map-action-bar md-toolbar").outerHeight();
    var windowheight=$(window).outerHeight();

    var targetheight = windowheight - (headerheight + mapbarheight);

    if(offset){
       targetheight = targetheight-offset;
    }

    $("#placemap .angular-google-map-container").css('height',targetheight+'px');
    $(".full-height").css('height',targetheight+'px');

}

$(window).resize(function(){
    angular.map_resize
});