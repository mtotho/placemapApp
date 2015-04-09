'use strict';

angular.module('placemapApp', [
    'ngMaterial',
    'ngAnimate',
    'ngDragDrop',
    'ngResource',
    'ui.router',
    'uiGmapgoogle-maps'
    ])

    .config(function ($mdThemingProvider, $httpProvider,uiGmapGoogleMapApiProvider) {
      /*  $mdThemingProvider.theme('default')
            .primaryPalette('light-green', {
                'default': '400', // by default use shade 400 from the pink palette for primary intentions
                'hue-1': '100', // use shade 100 for the <code>md-hue-1</code> class
                'hue-2': '600', // use shade 600 for the <code>md-hue-2</code> class
                'hue-3': 'A100' // use shade A100 for the <code>md-hue-3</code> class
            })*/

        $httpProvider.interceptors.push('TokenInterceptor');
        uiGmapGoogleMapApiProvider.configure({
           // key: 'AIzaSyD93JNhuGDGJKKgp8JGBpj60bDbbpMgJis',
            v: '3.17',
            libraries: 'weather,geometry,visualization,places'
        });


}).run(function($rootScope, $window, $location, AuthenticationFactory) {
        // when the page refreshes, check if the user is already logged in
        AuthenticationFactory.check();

        //$rootScope.$on("$routeChangeStart", function(event, nextRoute, currentRoute) {
        //    if ((nextRoute.access && nextRoute.access.requiredLogin) && !AuthenticationFactory.isLogged) {
        //        $location.path("/login");
        //    } else {
        //        // check if user object exists else fetch it. This is incase of a page refresh
        //        if (!AuthenticationFactory.user) AuthenticationFactory.user = $window.sessionStorage.user;
        //        if (!AuthenticationFactory.userRole) AuthenticationFactory.userRole = $window.sessionStorage.userRole;
        //    }
        //});
        //
        //$rootScope.$on('$routeChangeSuccess', function(event, nextRoute, currentRoute) {
        //    $rootScope.showMenu = AuthenticationFactory.isLogged;
        //    $rootScope.role = AuthenticationFactory.userRole;
        //    // if the user is already logged in, take him to the home page
        //    if (AuthenticationFactory.isLogged == true && $location.path() == '/login') {
        //        $location.path('/');
        //    }
        //});
    });


$(document).ready(function(){
  /*  var headerheight=$("header").outerHeight();

    var windowheight=$(window).outerHeight();

    var targetheight = windowheight - (headerheight );

    console.log(targetheight);

    //$(".name_panel").width(namewidth);


    $("#content").height(targetheight);*/
});

