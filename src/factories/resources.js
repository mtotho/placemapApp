'use strict';

angular.module('placemapApp').factory('Resources', function($resource) {



    return {
        places: $resource('/api/places/:id',{}, {
                get: {
                    method: 'GET',
                    isArray: false
                },
                create: {
                    method: 'POST'
                }
            }),
        feedback: $resource('/api/feedback/')

    };
});
