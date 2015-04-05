'use strict';

angular.module('placemapApp')
    .controller('AdminPlacesCtrl', function ($scope, $resource, $state,User) {
        var vm=this;

        var Places = $resource('/api/v1/places');

        vm.places = null;

        Places.query(function(places){
           console.log(places);
            vm.places = places;
        });


    });

