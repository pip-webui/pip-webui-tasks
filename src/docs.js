var _defaultsDeep = require('lodash.defaultsdeep');

var gulp = require('gulp');
var rename = require('gulp-rename');
var replace = require('gulp-replace');
var es = require('event-stream');
var awspublish = require('gulp-awspublish');
var webserver = require('gulp-webserver');
var parallelize = require('concurrent-transform');

var pkg = require(process.cwd() + '/package.json');

var defaultConfig = require('./default_config');
var buildConfig = require(process.cwd() + '/build.conf.js');
var conf = _defaultsDeep(buildConfig, defaultConfig);

module.exports = function () {

    gulp.task('docs-publish', function () {
        var
            publisher = awspublish.create({
                params: {
                    Bucket: conf.docs.publish.bucket
                },
                accessKeyId: conf.docs.publish.accessKeyId,
                secretAccessKey: conf.docs.publish.secretAccessKey,
                region: conf.docs.publish.region
            });

            // docFiles = gulp.src([
            //     conf.dir.docs + '**/*'
            // ], {xbase: '.'});

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

    gulp.task('docs-launch', function () {
        gulp.src(['.'])
            .pipe(webserver({
                port: conf.docs.port,
                open: 'http://localhost:' + conf.docs.port + '/' + conf.dir.docs + 'index.html'
            }));
    });
};