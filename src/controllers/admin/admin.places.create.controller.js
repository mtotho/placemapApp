'use strict';

angular.module('placemapApp')
    .controller('AdminPlacesCreateCtrl', function ($scope, $resource, $state,User) {
        var vm=this;
        var PlaceResource = $resource('/api/v1/places/');

        var Place = function(){
            this.name = "";
            this.isPublic = false;
            this.center =
            {
                latitude: null,
                longitude:null
            };
            this.zoom = null;
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

                var newplace = new PlaceResource($scope.place);
                newplace.$save(function(data){

                    $state.go('Admin.places');
                });
              //  var date = new Date;
                //var unixtime=parseInt(date.getTime()/1000);
                //var unixtime_to_date = new Date(unixtime*1000);
                //
                //var sa = new API.Studyarea();
                //sa.name=$scope.StudyAreaName;
                //sa.default_zoom=$scope.map.zoom;
                //sa.lat=""+$scope.map.center.latitude;
                //sa.lng=""+$scope.map.center.longitude;
                ////sa.timestamp = unixtime_to_date
                //sa.is_public = $scope.chkListPublic;
                //sa.default_audit_type=$scope.selQS._id;
                //console.log(sa);
                //sa.$save(function(result){
                //    storage.in_progress=false;
                //    $state.transitionTo("admin.studyareas");
                //});

            }


        }

        //Size map height after it loadss
        $scope.$on('$viewContentLoaded', function () {
            map_resize(40);
        });


    });


$(window).resize(function(){
    map_resize(40);
});