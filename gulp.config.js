module.exports = function(){
    var source = './src/';
    var client = source + 'client/';
    var server = './';


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
        html:client+ '**/*.html',
        defaultPort: 8080,
        browserSyncPort:2201,
        server: server,
        source:source,
        nodeServer: './placemap.js'
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