var ngdocs = require('gulp-ngdocs');
var runSequence = require('run-sequence');
var connect = require('gulp-connect');
var del = require('del');

// For api publishing
var awspublish = require('gulp-awspublish');
var rename = require('gulp-rename');
var parallelize = require('concurrent-transform');

var pkg = require(process.cwd() + '/package.json');
var conf = require('./config');

module.exports = function (gulp) {

    gulp.task('api-generate', function () {
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

        return gulp.src(conf.dir.src + '**/*.js')
            .pipe(ngdocs.process(options))
            .pipe(gulp.dest(conf.dir.api));
    });

    gulp.task('api-connect', function() {
        connect.server({
            root: conf.dir.api,
            port: conf.api.port,
            https: conf.api.https
        });
    });

    gulp.task('api-publish', function () {
        var
            publisher = awspublish.create({
                params: {
                    Bucket: conf.api.publish.bucket
                },
                accessKeyId: conf.api.publish.accessKeyId,
                secretAccessKey: conf.api.publish.secretAccessKey,
                region: conf.api.publish.region
            });

        return gulp.src([
            conf.dir.api + '**/*'
        ], {xbase: '.'})
            .pipe(rename(function (path) {
                path.dirname = '/' + pkg.name + '/' + path.dirname
            }))
            .pipe(parallelize(publisher.publish(), 5))
            .pipe(publisher.sync(pkg.name))
            .pipe(awspublish.reporter());
    });

    gulp.task('api-reload', function () {
        gulp.src(conf.dir.api + '/*.html')
            .pipe(connect.reload());
    });

    gulp.task('api-watch', function () {
        gulp.watch([conf.dir.src + '**/*.js'], ['api-generate', 'api-reload']);
    });

    gulp.task('api-launch', ['api-connect', 'api-watch']);

    gulp.task('api-clean', function () {
        del([conf.dir.api]);
    });

    // Left for backward compatibility
    gulp.task('generate-docs', ['api-generate']);
    gulp.task('doc-publish', ['api-publish']);
    gulp.task('doc-serve', ['api-launch']);

};
