var gulp = require('gulp');
var eslint = require('gulp-eslint');
var lesshint = require('gulp-lesshint');
var Server = require('karma').Server;

var conf = require('./config');

module.exports = function () {

    gulp.task('test-jslint', function () {
        return gulp.src('./src/**/*.js')
            .pipe(eslint(conf.eslint))
            .pipe(eslint.format())
            .pipe(eslint.failAfterError());
    });

    gulp.task('test-lesslint', function () {
        return gulp.src('./src/**/*.less')
            .pipe(lesshint(conf.lesshint))
            .pipe(lesshint.reporter());
    });

    gulp.task('test-karma', function (done) {
        new Server({
            configFile: process.cwd() + '/karma.conf.js',
            singleRun: true
        }, done).start();
    });

    // Left for backward compatibility
    gulp.task('test', ['test-karma']);
    gulp.task('es-lint', ['test-eshint']);
    gulp.task('less-lint', ['test-lesshint']);

};
