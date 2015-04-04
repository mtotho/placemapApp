'use strict';

angular.module('placemapApp').factory('User', function($window) {

    var key = (function(){
        return $window.sessionStorage.user;
    })();

    var token = (function(){
        return $window.sessionStorage.token;
    })();

    var data = {
        "selectedBucket":null
    }


    var isLoggedIn = function(){
        var isLogged = false;

        if ($window.sessionStorage.token && $window.sessionStorage.user !== undefined) {
            isLogged = true;
        } else {
            isLogged = false;
        }

        return isLogged;
    }

    return {
        isLoggedIn:isLoggedIn,
        key:key,
        token: token,
        data:data
    };
});
