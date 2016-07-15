var _defaultsDeep = require('lodash.defaultsdeep');

var gulp = require('gulp');
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
var ngdocs = require('gulp-ngdocs');
var del = require('del');
var eslint = require('gulp-eslint');
var runSequence = require('run-sequence');
var lesshint = require('gulp-lesshint');
var Server = require('karma').Server;
var autoprefixer = require('gulp-autoprefixer');
var connect = require('gulp-connect');

// For docs publishing
var awspublish = require('gulp-awspublish');
var rename = require('gulp-rename');
var parallelize = require('concurrent-transform');

var pkg = require(process.cwd() + '/package.json');

var defaultConfig = require('./default_config');
var buildConfig = require(process.cwd() + '/build.conf.js');

var conf = _defaultsDeep(buildConfig, defaultConfig);

module.exports = function () {

    gulp.task('build-html-dev', function () {
        if (!conf.build.html) return;

        return gulp.src([
                conf.dir.src + '**/*.html'
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
                conf.dir.src + '**/*.html'
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

    gulp.task('build-js-dev', ['build-html-dev'], function () {
        if (!conf.build.js) return;

        return gulp.src([
                conf.dir.src + '**/*.js',
                conf.dir.temp + pkg.name + '-ts.js'
            ])
            .pipe(ngAnnotate({single_quotes: true, add: true, remove: true}))
            .pipe(addsrc(conf.dir.temp + pkg.name + '-html.js'))
            .pipe(sourceMaps.init({loadMaps: true}))
            .pipe(concat(pkg.name + '.js'))
            .pipe(sourceMaps.write('.'))
            .pipe(gulp.dest(conf.dir.dist));
    });

    gulp.task('build-js-prod', ['build-html-prod'], function () {
        if (!conf.build.js) return;

        return gulp.src([
                conf.dir.src + '**/*.js',
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

        return gulp.src(conf.dir.src + conf.module.index + '.less')
            .pipe(less())
            .pipe(concat(pkg.name + '.css'))
            .pipe(gulp.dest(conf.dir.dist));
    });

    gulp.task('build-css-prod', function () {
        if (!conf.build.css) return;

        return gulp.src(conf.dir.src + conf.module.index + '.less')
            .pipe(less())
            .pipe(minifyCss())
            .pipe(concat(pkg.name + '.min.css'))
            .pipe(gulp.dest(conf.dir.dist));
    });

    gulp.task('copy-lib', function () {
        if (!conf.build.lib) return;

        return gulp.src(conf.file.import)
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

    gulp.task('generate-docs', function () {
        var options = {
            title: 'API Reference',
            html5Mode: true,
            scripts: [
                'https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.3.20/angular.min.js',
                'https://cdnjs.cloudflare.com/ajax/libs/marked/0.3.5/marked.js',
                'https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.3.20/angular-animate.min.js'
            ],
            loadDefaults: {
                angular: false,
                marked: false,
                angularAnimate: false
            }

        };

        return gulp.src('./src/**/*.js')
            .pipe(ngdocs.process(options))
            .pipe(gulp.dest('./doc/api'));
    });

    gulp.task('doc-connect', function() {
        connect.server({
            root: './doc/api',
            port: 3000
        });
    });

    gulp.task('doc-publish', function () {
        var
            publisher = awspublish.create({
                params: {
                    Bucket: conf.docs.publish.bucket
                },
                accessKeyId: conf.docs.publish.accessKeyId,
                secretAccessKey: conf.docs.publish.secretAccessKey,
                region: conf.docs.publish.region
            });

        return gulp.src([
            conf.dir.docs + '**/*'
        ], {xbase: '.'})
            .pipe(rename(function (path) {
                path.dirname = '/' + pkg.name + '/' + path.dirname
            }))
            .pipe(parallelize(publisher.publish(), 5))
            .pipe(publisher.sync(pkg.name))
            .pipe(awspublish.reporter());
    });

    gulp.task('html', function () {
        gulp.src('./doc/api/*.html')
            .pipe(connect.reload());
    });

    gulp.task('doc-watch', function () {
        gulp.watch(['./src/**/*.js'], ['generate-docs', 'html']);
    });

    gulp.task('doc-serve', ['doc-connect', 'doc-watch']);

    gulp.task('js-lint', function () {
        return gulp.src('./src/**/*.js')
            .pipe(eslint('node_modules/pip-webui-tasks/config/.eslint'))
            .pipe(eslint.format())
            .pipe(eslint.failAfterError());
    });

    // TODO [apidhirnyi] Add process breaking on less styles error
    gulp.task('less-lint', function () {
        return gulp.src('./src/**/*.less')
            .pipe(lesshint({
                configPath: 'node_modules/pip-webui-tasks/config/.lesshint'
            }))
            .pipe(lesshint.reporter());
    });

    gulp.task('test', function (done) {
        new Server({
            configFile: process.cwd() + '/karma.conf.js',
            singleRun: true
        }, done).start();
    });

    gulp.task('cordova-build', function () {
        return gulp.src(conf.dir.dist + '/**/*.*', {base: conf.dir.dist})
            .pipe(gulp.dest(conf.dir.cordova));
    });

    gulp.task('build-res-dev', ['copy-images']);
    gulp.task('build-res-prod', ['copy-images']);

    gulp.task('build-dev', function (callback) {
        runSequence(['build-js-dev', 'build-css-dev', 'build-lib-dev', 'build-res-dev', 'generate-docs'],
            callback);
    });

    gulp.task('build-prod', function (callback) {
        runSequence(['build-js-prod', 'build-css-prod', 'build-lib-prod', 'build-res-prod', 'generate-docs'],
            callback);
    });

    gulp.task('build-clean', function () {
        del([conf.dir.temp, conf.dir.dist, conf.dir.lib]);
    });

    gulp.task('build-watch', function () {
        gulp.watch(conf.dir.src + '**/*', ['rebuild']);
    });

};
