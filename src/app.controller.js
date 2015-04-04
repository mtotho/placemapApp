'use strict';

angular.module('placemapApp')
    .controller('AppCtrl', function ($rootScope,$scope,AuthenticationFactory,UserAuthFactory, User, $state) {
        var vm=this;

        vm.selectedTab = 0;

        vm.isLoggedIn = User.isLoggedIn();
        $rootScope.$on("$stateChangeSuccess", function (event, toState, toParams, fromState, fromParams) {

            vm.currentState = toState;


            AuthenticationFactory.check();

            vm.isLoggedIn = User.isLoggedIn();




        });


        $rootScope.$on('loginChanged', function(bool){
            vm.isLoggedIn = bool;

        });



        vm.logout = function(){
            UserAuthFactory.logout();
            vm.isLoggedIn = false;
            $state.go('Login');
        }



    });

