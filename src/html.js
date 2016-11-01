var concat = require('gulp-concat');
var minifyHtml = require('gulp-minify-html');
var ngHtml2Js = require('gulp-ng-html2js');
var sourcemaps = require('gulp-sourcemaps');

var pkg = require(process.cwd() + '/package.json');
var conf = require('./config');

module.exports = function (gulp) {

    gulp.task('build-html-dev', function () {
        if (!conf.build.html) return;

        return gulp.src([
            conf.dir.src + '**/*.html',
            '!' + conf.dir.src + 'index*.html'
        ])
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(ngHtml2Js({
            moduleName: conf.module.name + '.Templates',
            prefix: conf.module.prefix,
            declareModule: true
        }))
        .pipe(concat(pkg.name + '-html.js'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(conf.dir.temp));
    });

    gulp.task('build-html-prod', function () {
        if (!conf.build.html) return;

        return gulp.src([
            conf.dir.src + '**/*.html',
            '!' + conf.dir.src + 'index*.html'
        ])
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(minifyHtml({empty: true, quotes: true, spare: true}))
        .pipe(ngHtml2Js({
            moduleName: conf.module.name + '.Templates',
            prefix: conf.module.prefix,
            declareModule: true
        }))
        .pipe(concat(pkg.name + '-html.min.js'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(conf.dir.temp));
    });

    gulp.task('build-html', ['build-html-prod']);

};