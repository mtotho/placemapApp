module.exports = function(){
    var client = './src/client/';
    var server = './src/server/';

    var config = {
        appjs:[
            client+'**/*.module.js',
            client+'**/*.js'
        ],
        browserReloadDelay: 1000,
        client:client,
        index:client+'index.html',
        bower:{
            json: require('./bower.json'),
            directory: './bower_components',
            ignorePath:'../..'
        },
        defaultPort: 2200,
        server: server,
        nodeServer: './src/server/app.js'
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