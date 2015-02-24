var gulp = require('gulp');
var config = require('./gulp.config')();
var $ = require('gulp-load-plugins')({lazy:true});
var args = require('yargs').argv;
var port = process.env.PORT || config.defaultPort;

gulp.task('check', function () {
    log('Analyzing source with JSHint and JSCS');
    return gulp
            .src(config.appjs)
            .pipe($.if(args.verbose, $.print()))
            .pipe($.jscs())
            .pipe($.jshint())
            .pipe($.jshint.reporter('jshint-stylish', {verbose:true}))
            .pipe($.jshint.reporter('fail'));


})

gulp.task('inject', function () {
    log("Injecting Client and Bower Javascript and CSS dependencies into index.html");

    var options = config.getWiredepDefaultOptions();
    var wiredep = require('wiredep').stream;

    gulp.src(config.index)
        .pipe(wiredep(options))
        .pipe($.inject(gulp.src(config.appjs).pipe($.print())))
        .pipe(gulp.dest(config.client));
})

gulp.task('serve-dev', ['inject'], function(){
    serve(true /* isDev */);

});

function serve(isDev, specRunner) {
    var nodeOptions = {
        script: config.nodeServer,
        delayTime: 1,
        env: {
            'PORT': port,
            'NODE_ENV': isDev ? 'dev' : 'build'
        },
        watch: [config.server]
    };

    return $.nodemon(nodeOptions)
        .on('restart', function(ev) {
            log('*** nodemon restarted');
            log('files changed on restart:\n' + ev);
            setTimeout(function() {
                browserSync.notify('reloading now ...');
                browserSync.reload({stream: false});
            }, config.browserReloadDelay);
        })
        .on('start', function() {
            log('*** nodemon started');
           // startBrowserSync(isDev, specRunner);
        })
        .on('crash', function() {
            log('*** nodemon crashed: script crashed for some reason');
        })
        .on('exit', function() {
            log('*** nodemon exited cleanly');
        });
}


function log(msg){
    if(typeof(msg)==='object'){
        for(var item in msg){
            if(msg.hasOwnProperty(item)){
                $.util.log($.util.colors.yellow(msg[item]));
            }
        }
    }else{
        $.util.log($.util.colors.yellow(msg));
    }
}