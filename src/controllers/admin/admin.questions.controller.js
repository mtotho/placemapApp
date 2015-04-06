'use strict';

angular.module('placemapApp')
    .controller('AdminQuestionsCtrl', function ($scope, $resource, $state) {
        var vm=this;

        var QuestionSet = $resource('/api/v1/questionsets');


        vm.questionsets=[{name:"one"},{name:"two"}];

        vm.newQS = {
            name:""
        };
        $scope.createSet = function(form){

            if(form.$valid) {
                var qs = new QuestionSet(vm.newQS);
             
                qs.$save(function(data){
                    console.log(data);
                });


            }
        }
        //vm.places = null;
        //
        //Questions.query(function(places){
        //    console.log(places);
        //    vm.places = places;
        //});
        //

    });

