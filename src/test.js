var _defaultsDeep = require('lodash.defaultsdeep');

var gulp = require('gulp');
var jshint = require('gulp-jshint');

var defaultConfig = require('./default_config');
var buildConfig = require(process.cwd() + '/build.conf.js');
var conf = _defaultsDeep(buildConfig, defaultConfig);

module.exports = function() {

    gulp.task('test-jshint', function() {
        return gulp.src(conf.dir.src + '**/*.js')
            .pipe(jshint())
            .pipe(jshint.reporter('default'));	
    });
    
};
