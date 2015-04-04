(function(){
    'use strict';
    angular.module('placemapApp')
        .config(function ($stateProvider,$locationProvider, $urlRouterProvider) {

            $stateProvider
                .state('Place', {
                    url: '/place/:placeId',
                    templateUrl: 'src/controllers/map/map.html',
                    controller: 'MapCtrl'
                }).state('Login',{
                    url:'/login',
                    templateUrl: 'src/controllers/login/login.html',
                    controller:'LoginCtrl as vm'
                }).state('Admin',{
                    url:'/admin',
                    templateUrl: 'src/controllers/admin/admin.html',
                    controller:'AdminCtrl as vm'
                });
            /* .state('About', {
             url: '/about',
             templateUrl: 'app/about/about.html',
             controller: 'AboutCtrl'
             });*/

            $urlRouterProvider.otherwise('/');

            //     $locationProvider.html5Mode(tru                e);
//

        });
})();