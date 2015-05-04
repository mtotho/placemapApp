'use strict';

angular.module('placemapApp').factory('MapService', function($rootScope, uiGmapGoogleMapApi, Resources) {


    var map = {
        center:
        {
            latitude: 40.748817,
            longitude: -73.985428
        },
        zoom: 13,
        control:{},
        options:{

        },
        markersControl:{}
    }

    var pointer = {


        id:"pointer",
        coords:{
            latitude:40.733973,
            longitude:-73.986695
        },
        options:{
            draggable:true,
            visible:false,
            animation:null
        },
        events:{
            drag:function(marker){
                //console.log(marker.getPosition());
                $rootScope.$broadcast('markerDrag', marker);
            }
        },
        control:{}

    }


    var showPointer = function(bool){
        if(bool){
            pointer.coords = {
                latitude:map.center.latitude,
                longitude:map.center.longitude
            };
            uiGmapGoogleMapApi.then(function(maps) {

                pointer.options.animation=maps.Animation.BOUNCE;

            });

        }else{

        }
        pointer.options.visible = bool;

    }

    var getPlace = function(placeid, callback){
        Resources.places.get({id:placeid},function(place){

            map.center = place.center;
            map.zoom = place.zoom;

            pointer.coords = {
                latitude:place.center.latitude,
                longitude:place.center.longitude
            };

           callback(place);
        });
    }



    return {
        map:map,
        pointer:pointer,
        getPlace:getPlace,
        showPointer:showPointer
    };
});
