var gulp = require('gulp');

var conf = require('./config');

module.exports = function () {

    gulp.task('cordova-copy', function () {
        return gulp.src(conf.dir.dist + '**/*.*', {base: conf.dir.dist})
            .pipe(gulp.dest(conf.dir.cordova));
    });

    // Left for backward compatibility and implementation in the future
    gulp.task('cordova-build', ['cordova-copy']);

};
