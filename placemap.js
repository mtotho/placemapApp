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

var port = process.env.PORT || 8080;
var routes;

var environment = process.env.NODE_ENV;

var apiserver = "localhost:2201";

app.use(favicon(__dirname + '/favicon.ico'));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(compress());
app.use(logger('dev'));
app.use(cors());
//app.use(errorHandler.init);

//rasoutes = require('./routes/index')(app);

console.log('About to crank up node');
console.log('PORT=' + port);
console.log('NODE_ENV=' + environment);
//sss
//asdasdss
switch (environment) {
    case 'build':
        console.log('** BUILD **');
        app.use(express.static('./build/'));
        app.use('/*', express.static('./build/index.html'));
        break;
    default:
        console.log('** DEV **');
        app.use(express.static('./src/client/'));
        app.use(express.static('./'));

        break;
}

app.listen(port, function() {
    console.log('Express server listening on port ' + port);
    console.log('\n__dirname = ' + __dirname +
    '\nprocess.cwd = ' + process.cwd());
});
app.use('/api', proxy(apiserver, {
    forwardPath: function(req, res) {

        return require('url').parse(req.url).path;
    }
}));
