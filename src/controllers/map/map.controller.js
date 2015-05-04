'use strict';

angular.module('placemapApp')
    .controller('MapCtrl', function ($scope,$stateParams,$resource,Resources,MapService, uiGmapGoogleMapApi) {
        var vm=this;

        var Place = $resource('/api/places');
        vm.placeName = $stateParams.name;
        vm.placeId = $stateParams.placeId;

        MapService.getPlace(vm.placeId,function(place){
            console.log(place);

            //
            //$scope.map.center = place.center;
            //$scope.map.zoom = place.zoom;
            //
            //$scope.pointer.coords = {
            //    latitude:place.center.latitude,
            //    longitude:place.center.longitude
            //};
        });

        //Resources.places.get({id:vm.placeId},function(place){
        //
        //
        //});
        //

        $scope.map = MapService.map;
        $scope.pointer = MapService.pointer;
        ////Define the map objects
        //$scope.map = {
        //    center:
        //    {
        //        latitude: 40.748817,
        //        longitude: -73.985428
        //    },
        //    zoom: 13,
        //    control:{},
        //    markersControl:{}
        //
        //};
        //
        //$scope.pointer = {
        //    id:"pointer",
        //    coords:{
        //        latitude:40.733973,
        //        longitude:-73.986695
        //    },
        //    options:{
        //        draggable:true
        //    },
        //    events:{},
        //    control:{}
        //}

        $scope.responseMarkers=[

        ]




        //Size map height after it loadss
        $scope.$on('$viewContentLoaded', function () {
          map_resize();
        });

        $scope.panToStudio = function(studioname){
            var result = $.grep($scope.spinLocations, function(e){ return e.options.title== studioname; });


            var studio=result[0];

            $scope.map.center={
                latitude: studio.latitude,
                longitude: studio.longitude
            }
            $scope.map.zoom=16;
        }


    });

function map_resize(offset){
    var headerheight=$("#header").outerHeight();
    var windowheight=$(window).outerHeight();

    var targetheight = windowheight - (headerheight);

    if(offset){
       targetheight = targetheight-offset;
    }
    $("#map_canvas .angular-google-map-container").css('height',targetheight+'px');
    $(".full-height").css('height',targetheight+'px');
    console.log(targetheight);
}

$(window).resize(function(){
    ///map_resize();
});