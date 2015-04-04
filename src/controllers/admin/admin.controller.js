'use strict';

angular.module('placemapApp')
    .controller('AdminCtrl', function ($scope,  $state,User) {
        var vm=this;

        if(!User.isLoggedIn()){
            $state.go('Login');
        }


    });

