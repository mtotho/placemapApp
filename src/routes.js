(function(){
    'use strict';
    angular.module('placemapApp')
        .config(function ($stateProvider,$locationProvider, $urlRouterProvider) {

            $stateProvider
                .state('Placeselect', {
                    url: '/places',
                    templateUrl: 'src/controllers/places/places.html',
                    controller: 'PlaceselectCtrl as vm'
                }).state('Place', {
                    url: '/places/:placeId/:name',
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
                }).state('Admin.places',{
                    url:'/places',
                    templateUrl: 'src/controllers/admin/admin.places.html',
                    controller:'AdminPlacesCtrl as vm'
                }).state('Admin.newplace',{
                    url:'/places/create',
                    templateUrl: 'src/controllers/admin/admin.places.create.html',
                    controller:'AdminPlacesCreateCtrl as vm'
                }).state('Admin.questions',{
                    url:'/questions',
                    templateUrl: 'src/controllers/admin/admin.questions.html',
                    controller:'AdminQuestionsCtrl as vm'
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