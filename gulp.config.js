module.exports = function(){
    var client = './app/';

    var config = {
        appjs:[
            client+'**/*.module.js',
            client+'**/*.js'
        ],
        client:client,
        index:'index.html',
        bower:{
            json: require('./bower.json'),
            directory: './bower_components',
            ignorePath:''
        }
    };

    config.getWiredepDefaultOptions = function(){
        var options = {
            bowerJson: config.bower.json,
            directory: config.bower.directory,
            ignorePath: config.bower.ignorePath
        }
        return options;
    }

    return config;
};