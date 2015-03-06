(function(){
    'use strict';
    angular.module('placemapApp')
        .config(function ($stateProvider,$locationProvider, $urlRouterProvider, $authProvider) {
            $authProvider.facebook({
                clientId: '624059410963642'
            });


            $authProvider.google({
                clientId: '699007912539-ni21l9nd91s1c5t7mpsc8m805m2520dt.apps.googleusercontent.com',
                redirectUri:window.location.origin || window.location.protocol + '//' + window.location.host, //+ '/api/user/login',
                url:window.location.origin + '/api/user/login' //'/auth/google'
            });

            $authProvider.github({
                clientId: '0ba2600b1dbdb756688b'
            });

            $authProvider.linkedin({
                clientId: '77cw786yignpzj'
            });

            $authProvider.yahoo({
                clientId: 'dj0yJmk9dkNGM0RTOHpOM0ZsJmQ9WVdrOVlVTm9hVk0wTkRRbWNHbzlNQS0tJnM9Y29uc3VtZXJzZWNyZXQmeD0wMA--'
            });

            $authProvider.live({
                clientId: '000000004C12E68D'
            });

            $authProvider.twitter({
                url: '/auth/twitter'
            });

            $authProvider.oauth2({
                name: 'foursquare',
                url: '/auth/foursquare',
                redirectUri: window.location.origin,
                clientId: 'MTCEJ3NGW2PNNB31WOSBFDSAD4MTHYVAZ1UKIULXZ2CVFC2K',
                authorizationEndpoint: 'https://foursquare.com/oauth2/authenticate',
            });

        });
})();