'use strict';

angular.module('placemapApp')
    .directive('placemapQuestion', function () {
        return {
            templateUrl: 'src/controllers/admin/questions/placemap-question.html',
            restrict: 'EA',
            scope:{
                "question":"="
            },
            //require:"^legacyToolExplorer",
            link: function (scope, element, attrs, ctrl) {

            },
            controller: function($scope){





            }//end controller
        };
    });