var gulp = require('gulp');
var config = require('./gulp.config')();
var $ = require('gulp-load-plugins')({lazy:true});
var args = require('yargs').argv;


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
        .pipe(gulp.dest('.'));
})

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