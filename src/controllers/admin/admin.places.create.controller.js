'use strict';

angular.module('placemapApp')
    .controller('AdminPlacesCreateCtrl', function ($scope, $resource, $state,User) {
        var vm=this;
        var PlaceResource = $resource('/api/v1/places/');


        var QuestionSet = $resource('/api/v1/questionsets');


        QuestionSet.query(function(data){
            vm.questionsets = data;

            console.log(data);

        });

        var Place = function(){
            this.name = "";
            this.isPublic = false;
            this.center =
            {
                latitude: null,
                longitude:null
            };
            this.zoom = null;
            this.question_set = null;
        }

        $scope.place = new Place();

        //Define the map objects
        $scope.map = {
            center:
            {
                latitude: 40.748817,
                longitude: -73.985428
            },
            zoom: 13,
            control:{},
            markersControl:{}

        };
        $scope.responseMarkers=[
            {
                id:1,
                coords:{
                    latitude:40.733973,
                    longitude:-73.986695
                },
                name:"Kathleen Toth"
            }
        ]




        $scope.createPlace = function(form){


            if(form.$valid) {

                $scope.place.zoom = $scope.map.zoom;
                $scope.place.center = $scope.map.center;

                console.log($scope.place);
                var newplace = new PlaceResource($scope.place);
                newplace.$save(function(data){
                    console.log(data);
                    $state.go('Admin.places');
                });

            }


        }

        //Size map height after it loadss
        $scope.$on('$viewContentLoaded', function () {
            map_resize(40);
        });


    });


function map_resize(offset){
    var headerheight=$("#header").outerHeight();
    var mapbarheight=88;
    var windowheight=$(window).outerHeight();

    var targetheight = windowheight - (headerheight + mapbarheight);

    if(offset){
        targetheight = targetheight-offset;
    }

    $("#map_canvas .angular-google-map-container").css('height',targetheight+'px');
    $(".full-height").css('height',targetheight+'px');

}
$(window).resize(function(){
    map_resize(40);
});