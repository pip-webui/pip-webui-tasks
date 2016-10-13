var runSequence = require('run-sequence');
var concat = require('gulp-concat');
var ts = require('gulp-typescript');
var less = require('gulp-less');
var minifyCss = require('gulp-clean-css');
var minifyJs = require('gulp-uglify');
var minifyHtml = require('gulp-minify-html');
var ngAnnotate = require('gulp-ng-annotate');
var sourceMaps = require('gulp-sourcemaps');
var ngHtml2Js = require('gulp-ng-html2js');
var addsrc = require('gulp-add-src');
var del = require('del');
var merge = require('merge2');

var pkg = require(process.cwd() + '/package.json');
var conf = require('./config');

module.exports = function (gulp) {

    gulp.task('build-html-dev', function () {
        if (!conf.build.html) return;

        return gulp.src([
            conf.dir.src + '**/*.html',
            '!' + conf.dir.src + 'index*.html'
        ])
        .pipe(ngHtml2Js({
            moduleName: conf.module.name + '.Templates',
            prefix: conf.module.prefix,
            declareModule: true
        }))
        .pipe(concat(pkg.name + '-html.js'))
        .pipe(gulp.dest(conf.dir.temp));
    });

    gulp.task('build-html-prod', function () {
        if (!conf.build.html) return;

        return gulp.src([
            conf.dir.src + '**/*.html',
            '!' + conf.dir.src + 'index*.html'
        ])
        .pipe(minifyHtml({empty: true, quotes: true, spare: true}))
        .pipe(ngHtml2Js({
            moduleName: conf.module.name + '.Templates',
            prefix: conf.module.prefix,
            declareModule: true
        }))
        .pipe(concat(pkg.name + '-html.min.js'))
        .pipe(gulp.dest(conf.dir.temp));
    });

    gulp.task('build-ts', function () {
        if (!conf.build.ts) return;

        var tsFiles = [
            conf.dir.src + '**/*.ts'
        ].concat(conf.file.def || []);

        var tsResult = gulp.src(tsFiles)
            .pipe(sourceMaps.init())
            .pipe(ts({
                noImplicitAny: true,
                noExternalResolve: true,
                declaration: true,
                sortOutput: true,
                allowJs: true,
                target: 'ES5'
            }));

        return merge([
            tsResult.dts
                .pipe(concat(pkg.name + '.d.ts'))
                .pipe(gulp.dest(conf.dir.dist)),
            tsResult.js
                .pipe(concat(pkg.name + '-ts.js'))
                .pipe(sourceMaps.write('.'))
                .pipe(gulp.dest(conf.dir.temp))
        ]);
    });

    gulp.task('build-js-dev', ['build-html-dev', 'build-ts'], function () {
        if (!conf.build.js) return;

        return gulp.src([
            conf.dir.src + '**/*.js',
            '!' + conf.dir.src + 'config*.js',
            '!' + conf.dir.src + 'cordova*.js',
            conf.dir.temp + pkg.name + '-ts.js'
        ])
        .pipe(ngAnnotate({single_quotes: true, add: true, remove: true}))
        .pipe(addsrc(conf.dir.temp + pkg.name + '-html.js'))
        .pipe(sourceMaps.init({loadMaps: true}))
        .pipe(concat(pkg.name + '.js'))
        .pipe(sourceMaps.write('.'))
        .pipe(gulp.dest(conf.dir.dist));
    });

    gulp.task('build-js-prod', ['build-html-prod', 'build-ts'], function () {
        if (!conf.build.js) return;

        return gulp.src([
            conf.dir.src + '**/*.js',
            '!' + conf.dir.src + 'config*.js',
            '!' + conf.dir.src + 'cordova*.js',
            conf.dir.temp + pkg.name + '-ts.js'
        ])
        .pipe(ngAnnotate({single_quotes: true, add: true, remove: true}))
        .pipe(addsrc(conf.dir.temp + pkg.name + '-html.min.js'))
        //.pipe(sourceMaps.init({ loadMaps: true }))
        .pipe(concat(pkg.name + '.min.js'))
        .pipe(minifyJs())
        //.pipe(sourceMaps.write('.'))
        .pipe(gulp.dest(conf.dir.dist));
    });

    gulp.task('build-css-dev', function () {
        if (!conf.build.css) return;

        return gulp.src(conf.dir.src + conf.module.styles + '.less')
            .pipe(less())
            .pipe(concat(pkg.name + '.css'))
            .pipe(gulp.dest(conf.dir.dist));
    });

    gulp.task('build-css-prod', function () {
        if (!conf.build.css) return;

        return gulp.src(conf.dir.src +  conf.module.styles + '.less')
            .pipe(less())
            .pipe(minifyCss())
            .pipe(concat(pkg.name + '.min.css'))
            .pipe(gulp.dest(conf.dir.dist));
    });

    gulp.task('copy-lib', function () {
        if (!conf.build.lib) return;

        return gulp.src(conf.file.import || conf.file.lib)
            .pipe(gulp.dest(conf.dir.lib));
    });

    gulp.task('build-lib-dev', ['copy-lib']);
    gulp.task('build-lib-prod', ['copy-lib']);

    gulp.task('copy-images', function () {
        if (!conf.build.images) return;

        return gulp.src(conf.dir.src + 'images/**/*.*', {base: conf.dir.src})
            .pipe(gulp.dest(conf.dir.dist))
            .pipe(gulp.dest(conf.dir.samples));
    });

    gulp.task('copy-index', function () {
        return gulp.src([
            conf.dir.src + 'index*.html',
            conf.dir.src + 'config*.js',
            conf.dir.src + 'cordova*.js'
        ]).pipe(gulp.dest(conf.dir.dist));
    });

    gulp.task('build-res-dev', ['copy-images', 'copy-index']);
    gulp.task('build-res-prod', ['copy-images', 'copy-index']);

    gulp.task('copy-dist', function () {
        if (!conf.build.dist) return;

        return gulp.src(conf.dir.lib + '**/*.*', {base: conf.dir.lib})
            .pipe(gulp.dest(conf.dir.dist));
    });

    gulp.task('build-dist', ['copy-dist']);

    gulp.task('build-dev', function (callback) {
        runSequence(['build-js-dev', 'build-css-dev', 'build-lib-dev', 'build-res-dev'], 'build-dist',
            callback);
    });

    gulp.task('build-prod', function (callback) {
        runSequence(['build-js-prod', 'build-css-prod', 'build-lib-prod', 'build-res-prod'], 'build-dist',
            callback);
    });

    gulp.task('build-clean', function () {
        del([conf.dir.temp, conf.dir.dist, conf.dir.lib]);
    });

    gulp.task('build-watch', function () {
        gulp.watch(conf.dir.src + '**/*', ['rebuild']);
    });

};