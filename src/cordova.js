var _defaultsDeep = require('lodash.defaultsdeep');

var gulp = require('gulp');

var defaultConfig = require('./default_config');
var buildConfig = require(process.cwd() + '/build.conf.js');

var conf = _defaultsDeep(buildConfig, defaultConfig);

module.exports = function () {

    gulp.task('cordova-copy', function () {
        return gulp.src(conf.dir.dist + '**/*.*', {base: conf.dir.dist})
            .pipe(gulp.dest(conf.dir.cordova));
    });

    // Left for backward compatibility and implementation in the future
    gulp.task('cordova-build', ['cordova-copy']);

};
