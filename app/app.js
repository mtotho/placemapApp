'use strict';

angular.module('placemapApp', [
    'ngMaterial',
    'ui.router',
    'uiGmapgoogle-maps',
    'tothcommon.security'
    ])

    .config(function ($mdThemingProvider, uiGmapGoogleMapApiProvider) {
      /*  $mdThemingProvider.theme('default')
            .primaryPalette('light-green', {
                'default': '400', // by default use shade 400 from the pink palette for primary intentions
                'hue-1': '100', // use shade 100 for the <code>md-hue-1</code> class
                'hue-2': '600', // use shade 600 for the <code>md-hue-2</code> class
                'hue-3': 'A100' // use shade A100 for the <code>md-hue-3</code> class
            })*/


        uiGmapGoogleMapApiProvider.configure({
           // key: 'AIzaSyD93JNhuGDGJKKgp8JGBpj60bDbbpMgJis',
            v: '3.17',
            libraries: 'weather,geometry,visualization,places'
        });
});


$(document).ready(function(){
  /*  var headerheight=$("header").outerHeight();

    var windowheight=$(window).outerHeight();

    var targetheight = windowheight - (headerheight );

    console.log(targetheight);

    //$(".name_panel").width(namewidth);


    $("#content").height(targetheight);*/
});

