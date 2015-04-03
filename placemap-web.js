'use strict';

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var compress = require('compression');
var cors = require('cors');
//var errorHandler = require('./routes/utils/errorHandler')();
var favicon = require('serve-favicon');
var logger = require('morgan');
var proxy = require('express-http-proxy');
var config = require('./server.config')();

var routes;

var environment = process.env.NODE_ENV;

app.use('/api', proxy(config.apiserver, {
    forwardPath: function(req, res) {

        return require('url').parse(req.url).path;
    }
}));


//app.use(favicon(__dirname + '/LEGACY_Favicon.ico'));
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
app.use(compress());
app.use(logger('dev'));
app.use(cors());

console.log('About to crank up node');
console.log('PORT=' + config.port);
console.log('NODE_ENV=' + environment);

switch (environment) {
    case 'build':
        console.log('** BUILD **');
        app.use(express.static('./build/'));
        app.use('/*', express.static('./build/index.html'));
        break;
    default:
        console.log('** DEV **');
        app.use(express.static('./src/'));
        app.use(express.static('./'));

        break;
}

app.listen(config.port, function() {
    console.log('Express server listening on port ' + config.port);
    console.log('\n__dirname = ' + __dirname +
    '\nprocess.cwd = ' + process.cwd());
});

