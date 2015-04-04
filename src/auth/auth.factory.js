'use strict';

angular.module('placemapApp').factory('AuthenticationFactory', function($window) {
    var auth = {
        isLogged: false,
        check: function() {
           // AuthenticationFactory.isLogged = false;


            if ($window.sessionStorage.token && $window.sessionStorage.user && $window.sessionStorage.user.trim() != "") {
                this.isLogged = true;
            } else {
                this.isLogged = false;
                delete this.user;
            }
        }
    }

    return auth;
});

angular.module('placemapApp').factory('UserAuthFactory', function($window, $location, $http, AuthenticationFactory) {
    return {
        login: function(username, password) {
            return $http.post('/api/login', {
                username: username,
                password: password
            });
        },
        logout: function() {

            if (AuthenticationFactory.isLogged) {

                console.log("destroying login");
                AuthenticationFactory.isLogged = false;
                delete AuthenticationFactory.user;
                delete AuthenticationFactory.userRole;

                delete $window.sessionStorage.token;
                delete $window.sessionStorage.user;
                delete $window.sessionStorage.userRole;


            }

        }
    }
});

angular.module('placemapApp').factory('TokenInterceptor', function($q, $window) {
    return {
        request: function(config) {

            config.headers = config.headers || {};
            if ($window.sessionStorage.token) {
                config.headers['X-Access-Token'] = $window.sessionStorage.token;
                config.headers['X-Key'] = $window.sessionStorage.user;
                config.headers['Content-Type'] = "application/json";
            }

            return config || $q.when(config);
        },

        response: function(response) {
            return response || $q.when(response);
        }
    };
});