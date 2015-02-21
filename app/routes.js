(function(){
    'use strict';
angular.module('placemapApp')
    .config(function ($stateProvider,$locationProvider, $urlRouterProvider) {

        $stateProvider
            .state('Place', {
                url: '/place/:placeId',
                templateUrl: 'app/map/map.html',
                controller: 'MapCtrl'
            });
           /* .state('About', {
                url: '/about',
                templateUrl: 'app/about/about.html',
                controller: 'AboutCtrl'
            });*/

            $urlRouterProvider.otherwise('/');

    //     $locationProvider.html5Mode(true);


    });
})();