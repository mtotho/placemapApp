/**
 * Created by Michael on 4/2/2015.
 */
module.exports = function() {
    var environment = process.env.NODE_ENV;


    var devconfig = {
        port:8081,
        apiserver:"localhost:8080"

    };

    var prodconfig = {
        port:8081,
        apiserver:"localhost:8080"

    }

    switch(process.env.NODE_ENV){
        case 'development':
            return devconfig;

        case 'production':
            return prodconfig;

        default:
            return devconfig;
    }

};
