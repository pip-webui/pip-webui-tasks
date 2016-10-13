var rename = require('gulp-rename');
var replace = require('gulp-replace');
var es = require('event-stream');
var webserver = require('gulp-webserver');
var publish = require('./publish');

var pkg = require(process.cwd() + '/package.json');
var conf = require('./config');

module.exports = function (gulp) {

    gulp.task('samples-publish', function () {
        var
            storage = conf.samples.publish,

            distFiles = gulp.src([
                conf.dir.lib + '/**/*',
                conf.dir.dist + '/**/*'
            ], {xbase: '.'}),

            indexFiles = gulp.src([
                    conf.dir.samples + '**/index.*'
                ], {xbase: '.'})
                .pipe(replace(pkg.name + '-lib.css', pkg.name + '-lib.min.css'))
                .pipe(replace(pkg.name + '-lib.js', pkg.name + '-lib.min.js'))
                .pipe(replace(pkg.name + '.css', pkg.name + '.min.css'))
                .pipe(replace(pkg.name + '.js', pkg.name + '.min.js'))
                .pipe(replace('../../.' + conf.dir.lib, '')) // '/' + pkg.name + '/'))
                .pipe(replace('../.' + conf.dir.lib, '')) // '/' + pkg.name + '/'))
                .pipe(replace('.' + conf.dir.lib, '')) // '/' + pkg.name + '/'))
                .pipe(replace('../../.' + conf.dir.dist, '')) // '/' + pkg.name + '/'))
                .pipe(replace('../.' + conf.dir.dist, '')) // '/' + pkg.name + '/'))
                .pipe(replace('.' + conf.dir.dist, '')), // '/' + pkg.name + '/')),

            sampleFiles = gulp.src([
                conf.dir.samples + '**/*',
                '!' + conf.dir.samples + '**/index.*'
            ], {xbase: '.'});

        var 
            files = es.merge([distFiles, indexFiles, sampleFiles])
                .pipe(rename(function (path) {
                    path.dirname = '/' + pkg.name + '/' + path.dirname
                }));

        // Put sample into folder same as module name
        storage.folder = storage.folder || pkg.name;

        return publish(storage, files);
    });

    gulp.task('samples-launch', function () {
        var protocol = conf.samples.https ? "https" : "http";

        gulp.src(['.'])
            .pipe(webserver({
                port: conf.samples.port,
                https: conf.samples.https,
                //livereload: false,
                //directoryListing: false,
                open: protocol + '://localhost:' + conf.samples.port + '/' + conf.dir.samples + 'index.html'
            }));
    });
};