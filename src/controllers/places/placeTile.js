'use strict';

angular.module('placemapApp')
    .directive('placeTile', function () {
        return {
            templateUrl: 'src/controllers/places/place-tile.html?v=1',
            restrict: 'EA',
            scope:{
                "place":"="
            },
            link: function (scope, element, attrs) {

            },
            controller: function($scope){



            }//end controller
        };
    });