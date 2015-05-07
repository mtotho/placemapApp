'use strict';

angular.module('placemapApp')
    .controller('AppCtrl', function ($rootScope,$scope,AuthenticationFactory,UserAuthFactory, $mdSidenav, User, $state) {
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

        vm.toggleSideNav = function(){
            $mdSidenav('right').toggle();
        }
        vm.goToState = function(state){
            $state.go(state);
            $mdSidenav('right').toggle();
        }


        vm.logout = function(toggle){
            if(toggle){
                $mdSidenav('right').toggle();
            }
            UserAuthFactory.logout();
            vm.isLoggedIn = false;
            $state.go('Login');
        }



    });

