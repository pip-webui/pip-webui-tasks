var runSequence = require('run-sequence');
var concat = require('gulp-concat');
var minifyJs = require('gulp-uglify');
var ngAnnotate = require('gulp-ng-annotate');
var sourceMaps = require('gulp-sourcemaps');
var addsrc = require('gulp-add-src');

var pkg = require(process.cwd() + '/package.json');
var conf = require('./config');

module.exports = function (gulp) {

    // gulp.task('build-js-dev', ['build-html', 'build-ts'], function () {
    //     if (!conf.build.js) return;

    //     if (conf.build.bundle)
    //         throw Error("Cannot user build.js option together with build.bundle")

    //     return gulp.src([
    //         conf.dir.src + '**/*.js',
    //         '!' + conf.dir.src + 'config*.js',
    //         '!' + conf.dir.src + 'cordova*.js',
    //         conf.dir.temp + pkg.name + '-ts.js'
    //     ])
    //     .pipe(ngAnnotate({single_quotes: true, add: true, remove: true}))
    //     .pipe(addsrc(conf.dir.temp + pkg.name + '-html.min.js'))
    //     .pipe(sourceMaps.init({loadMaps: true}))
    //     .pipe(concat(pkg.name + '.js'))
    //     .pipe(sourceMaps.write('.'))
    //     .pipe(gulp.dest(conf.dir.dist));
    // });

    gulp.task('build-js', ['build-html', 'build-ts'], function () {
        if (!conf.build.js) return;

        if (conf.build.bundle)
            throw Error("Cannot user build.js option together with build.bundle")

        return gulp.src([
            conf.dir.src + '**/*.js',
            '!' + conf.dir.src + 'config*.js',
            '!' + conf.dir.src + 'cordova*.js',
            conf.dir.temp + pkg.name + '-ts.js'
        ])
        .pipe(ngAnnotate({single_quotes: true, add: true, remove: true}))
        .pipe(addsrc(conf.dir.temp + pkg.name + '-html.min.js'))
        .pipe(sourceMaps.init({ loadMaps: true }))
        .pipe(concat(pkg.name + '.min.js'))
        .pipe(minifyJs())
        .pipe(sourceMaps.write('.'))
        .pipe(gulp.dest(conf.dir.dist));
    });

};