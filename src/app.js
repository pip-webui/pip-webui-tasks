var gulp = require('gulp');
var rename = require('gulp-rename');
var replace = require('gulp-replace');
var es = require('event-stream');
var awspublish = require('gulp-awspublish');
var webserver = require('gulp-webserver');
var parallelize = require('concurrent-transform');

var pkg = require(process.cwd() + '/package.json');
var conf = require('./config');

module.exports = function () {

    gulp.task('app-publish', function () {
        var
            publisher = awspublish.create({
                params: {
                    Bucket: conf.app.publish.bucket
                },
                accessKeyId: conf.app.publish.accessKeyId,
                secretAccessKey: conf.app.publish.secretAccessKey,
                region: conf.app.publish.region
            }),

            distFiles = gulp.src([
                conf.dir.dist + '**/*',
                '!' + conf.dir.dist + '**/index.*'
            ], {xbase: '.'}),

            indexFiles = gulp.src([
                    conf.dir.dist + '**/index.*'
                ], {xbase: '.'})
                .pipe(replace(pkg.name + '-lib.css', pkg.name + '-lib.min.css'))
                .pipe(replace(pkg.name + '-lib.js', pkg.name + '-lib.min.js'))
                .pipe(replace(pkg.name + '.css', pkg.name + '.min.css'))
                .pipe(replace(pkg.name + '.js', pkg.name + '.min.js'));
                // .pipe(replace('../../.' + conf.dir.lib, '/' + pkg.name + '/'))
                // .pipe(replace('../.' + conf.dir.lib, '/' + pkg.name + '/'))
                // .pipe(replace('.' + conf.dir.lib, '/' + pkg.name + '/'))
                // .pipe(replace('../../.' + conf.dir.dist, '/' + pkg.name + '/'))
                // .pipe(replace('../.' + conf.dir.dist, '/' + pkg.name + '/'))
                // .pipe(replace('.' + conf.dir.dist, '/' + pkg.name + '/')),

        return es.merge([distFiles, indexFiles])
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
};