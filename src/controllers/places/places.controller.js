'use strict';

angular.module('placemapApp')
    .controller('PlaceselectCtrl', function ($scope, $resource) {
        var vm=this;

        var Places = $resource('/api/places');

        vm.places = null;

        Places.query(function(places){
            console.log(places);
            vm.places = places;
        });


    });

