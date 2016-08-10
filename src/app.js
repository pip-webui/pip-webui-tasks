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
var rename = require('gulp-rename');
var awspublish = require('gulp-awspublish');
var webserver = require('gulp-webserver');
var parallelize = require('concurrent-transform');
var del = require('del');
var merge = require('merge2');

var pkg = require(process.cwd() + '/package.json');
var conf = require('./config');

module.exports = function () {

    gulp.task('build-app-html', function () {
        if (!conf.build.html) return;
        return gulp.src([
            conf.dir.src + '**/*.html',
            '!' + conf.dir.src + 'index.html'
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

    gulp.task('build-app-ts', function () {
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

    gulp.task('build-app-js', ['build-app-html', 'build-app-ts'], function () {
        if (!conf.build.js) return;

        return gulp.src([
            conf.dir.src + '**/*.js',
            '!' + conf.dir.src + 'config*.js',
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

    gulp.task('build-app-css', function () {
        if (!conf.build.css) return;

        return gulp.src(conf.dir.src + conf.module.styles + '.less')
            .pipe(less())
            .pipe(minifyCss())
            .pipe(concat(pkg.name + '.min.css'))
            .pipe(gulp.dest(conf.dir.dist));
    });

    gulp.task('copy-app-images', function () {
        if (!conf.build.images) return;

        return gulp.src(conf.dir.src + 'images/**/*.*', {base: conf.dir.src})
            .pipe(gulp.dest(conf.dir.dist));
    });

    gulp.task('copy-app-lib', function () {
        if (!conf.build.lib) return;

        return gulp.src(conf.file.import || conf.file.lib)
            .pipe(gulp.dest(conf.dir.dist));
    });

    gulp.task('copy-app-index', function () {
        return gulp.src([
            conf.dir.src + 'index.html',
            conf.dir.src + 'config*.js'
        ]).pipe(gulp.dest(conf.dir.dist));
    });

    gulp.task('app-build', ['build-app-html', 'build-app-css', 'build-app-js', 'copy-app-images', 'copy-app-lib', 'copy-app-index']);

    gulp.task('app-publish-alpha', ['app-build'], function () {
        var
            publisher = awspublish.create({
                params: {
                    Bucket: conf.app.publish.alpha.bucket
                },
                accessKeyId: conf.app.publish.alpha.accessKeyId,
                secretAccessKey: conf.app.publish.alpha.secretAccessKey,
                region: conf.app.publish.alpha.region
            });

        // For now copy everything under dist except a few known files
        gulp.src([
            conf.dir.dist + '**/*',
            '!' + conf.dir.dist + '**/config-beta.*',
            '!' + conf.dir.dist + '**/config-prod*.*',
            '!' + conf.dir.dist + '**/*.map'], {xbase: '.'})
            .pipe(rename(function (path) {
                path.dirname = '/' + pkg.name + '/' + path.dirname
            }))
            .pipe(parallelize(publisher.publish(), 5))
            .pipe(publisher.sync(pkg.name))
            .pipe(awspublish.reporter());
    });

    gulp.task('app-launch', function () {
        gulp.src(['.'])
            .pipe(webserver({
                port: conf.app.port,
                //livereload: false,
                //directoryListing: false,
                open: 'http://localhost:' + conf.app.port + '/' + conf.dir.dist + 'index.html'
            }));
    });

    gulp.task('app-clean', function () {
        del([conf.dir.temp, conf.dir.dist, conf.dir.lib]);
    });

};