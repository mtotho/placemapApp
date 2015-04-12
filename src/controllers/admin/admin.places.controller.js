'use strict';

angular.module('placemapApp')
    .controller('AdminPlacesCtrl', function ($scope, $resource, $mdToast, $state,User) {
        var vm=this;

        var Places = $resource('/api/v1/places/:id',null,{
            'update': {method:'PUT'}
        });


        var QuestionSet = $resource('/api/v1/questionsets');
        vm.places = null;

        Places.query(function(places){
            console.log(places);
            vm.places = places;
        });


        QuestionSet.query(function(data){
            vm.questionsets = data;

            console.log(data);

        });

        vm.updatePlace = function(place){
            console.log(place);
            Places.update({id:place._id}, place, function(data){
                console.log(data);

                $mdToast.show(
                    $mdToast.simple()
                        .content(data.name + ' update successfully!')
                        .position('top right')
                        .hideDelay(2000)
                );
            });
        }


    });

