'use strict';

angular.module('placemapApp')
    .controller('LoginCtrl', function ($scope, $mdDialog, $state,User, $window, $location, UserAuthFactory, $rootScope, AuthenticationFactory) {
        var vm=this;

        if(User.isLoggedIn()){
            $state.go('Admin');
        }

        $scope.submitLogin = function(form){
            if (form.$valid) {

                var username = $scope.user.username,
                    password = $scope.user.password;


                UserAuthFactory.login(username, password).success(function(data) {

                    console.log(data);
                    AuthenticationFactory.isLogged = true;

                    AuthenticationFactory.user = $scope.user.username;
                    AuthenticationFactory.userRole = data.user.role;

                    $window.sessionStorage.token = data.token;
                    $window.sessionStorage.user = $scope.user.username; // to fetch the user details on refresh
                    $window.sessionStorage.userRole = data.user.role; // to fetch the user details on refresh


                    $rootScope.$broadcast("loginChanged", true);
                    $state.go('Admin');

                }).error(function(status) {

                    $mdDialog.show(
                        $mdDialog.alert()
                            .title('Login')
                            .content('Invalid Credentials')
                            .ariaLabel('Login unavailable')
                            .ok('Got it!')

                    );
                });


            }
        }
    });

