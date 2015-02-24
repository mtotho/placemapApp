'use strict';

angular.module('placemapApp')
    .controller('MapCtrl', function ($scope,CurrentUser,loginRedirect,GAPI, uiGmapGoogleMapApi) {
        //var vm=this;


        //throw new Error("Something has gone wrong");
        $scope.badbind="der[";
        //Define the map object
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
        var additionalParams = {
            'callback': function(authResult){
                CurrentUser.setProfile("Google User", authResult.access_token);
                console.log(authResult);
                loginRedirect.redirectPostLogin();

            //TODO: get username from given api endpoint
                //set current user

                //CurrentUser.setProfile()
            }
        };

        $scope.signInWithGoogle =function(){
            gapi.auth.signIn(additionalParams);
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




        //Size map height after it loads
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

function map_resize(){
    var headerheight=$("#header").outerHeight();
    var windowheight=$(window).outerHeight();

    var targetheight = windowheight - (headerheight);

    $("#map_canvas .angular-google-map-container").css('height',targetheight+'px');
    $(".full-height").css('height',targetheight+'px');
    console.log(targetheight);
}

$(window).resize(function(){
    map_resize();
});