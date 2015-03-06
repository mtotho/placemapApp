var gulp = require('gulp');
var webserver = require('gulp-webserver');
var config = require('./gulp.config')();
var browserSync = require('browser-sync');
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
    console.log(config);
    var options = config.getWiredepDefaultOptions();
    var wiredep = require('wiredep').stream;

    gulp.src(config.index)
        .pipe(wiredep(options))
        .pipe($.inject(gulp.src(config.appjs).pipe($.print())))
        .pipe(gulp.dest(config.client));
})

gulp.task('serve-dev', ['inject'], function(){
   serve(true /* isDev */);

   /* gulp.src(config.client)
        .pipe(webserver({
            livereload:true,
            proxies:[{source:'/api', target:'http://localhost:1337/'}, {source:'/api', target:'http://localhost:1337/'}]
        }));*/
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
            log('*** nodemon restarted', "inverse");
            log('files changed on restart:\n' + ev);
            setTimeout(function() {
             //   browserSync.notify('reloading now ...');
            //    browserSync.reload({stream: false});
            }, config.browserReloadDelay);
        })
        .on('start', function() {
            log('*** nodemon started',"green");
         //   startBrowserSync(isDev, specRunner);
        })
        .on('crash', function() {
            log('*** nodemon crashed: script crashed for some reason', "red");
        })
        .on('exit', function() {
            log('*** nodemon exited cleanly', "green");
        });
}


function log(msg,color){
    if(typeof(msg)==='object'){
        for(var item in msg){
            if(msg.hasOwnProperty(item)){
                $.util.log($.util.colors.yellow(msg[item]));
            }
        }
    }else{


        if(color){

            $.util.log($.util.colors[color].yellow(msg));
        }else{
            $.util.log($.util.colors.yellow(msg));
        }
    }
}

function startBrowserSync(isDev, specRunner) {
    if (args.nosync || browserSync.active) {
        return;
    }

    log('Starting browser-sync on port ' + port);

    if (isDev) {

        gulp.watch([ config.appjs, config.html], [browserSync.reload])
            .on('change', changeEvent);
    }

    var options = {
        proxy: 'localhost:' + port,
        port: config.browserSyncPort,
        files: isDev ? [
            config.client + '**/*.*'
          //  '!' + config.less,
           // config.temp + '**/*.css'
        ] : [],
        ghostMode: {
            clicks: true,
            location: false,
            forms: true,
            scroll: true
        },
        injectChanges: true,
        logFileChanges: true,
        logLevel: 'debug',
        logPrefix: 'gulp-patterns',
        notify: true,
        reloadDelay: 0 //1000
    };

    if (specRunner) {
        options.startPath = config.specRunnerFile;
    }

    browserSync(options);
}
function changeEvent(event) {
    var srcPattern = new RegExp('/.*(?=/' + config.source + ')/');
    log('File ' + event.path.replace(srcPattern, '') + ' ' + event.type);
}
