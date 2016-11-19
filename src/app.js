var rename = require('gulp-rename');
var webserver = require('gulp-webserver');
var es = require('event-stream');
var publish = require('./publish');

var pkg = require(process.cwd() + '/package.json');
var conf = require('./config');

module.exports = function (gulp) {
        
    gulp.task('app-publish-alpha', function () {
        var
            storage = conf.app.publish.alpha,

            distFiles = gulp.src([
                conf.dir.dist + '**/*',
                '!' + conf.dir.dist + '**/*.map'], {xbase: '.'}
            );

        var
            files = distFiles
                .pipe(rename(function (path) {
                    if(storage.folder && storage.folder != '') {
                        path.dirname = '/' + storage.folder + '/' + path.dirname
                    }
                }));

        return publish(storage, files);
    });

    gulp.task('app-publish-beta', function () {
        var
            storage = conf.app.publish.beta,

            configFiles = gulp.src(conf.dir.dist + 'config_beta.js')
                .pipe(rename('config.js'))
                .pipe(gulp.dest(conf.dir.dist)),

            distFiles = gulp.src([
                conf.dir.dist + '**/*',
                '!' + conf.dir.dist + '**/config*.js',
                '!' + conf.dir.dist + '**/*.map'], {xbase: '.'});

        var 
            files = es.merge([configFiles, distFiles])
                .pipe(rename(function (path) {
                    if(storage.folder && storage.folder != '') {
                        path.dirname = '/' + storage.folder + '/' + path.dirname;
                    }
                }));    

        return publish(storage, files);
    });

    gulp.task('app-publish-prod', function () {
        var
            storage = conf.app.publish.prod,

            configFiles = gulp.src(conf.dir.dist + 'config_prod.js')
                .pipe(rename('config.js'))
                .pipe(gulp.dest(conf.dir.dist)),

            distFiles = gulp.src([
                conf.dir.dist + '**/*',
                '!' + conf.dir.dist + '**/config*.js',
                '!' + conf.dir.dist + '**/*.map'], {xbase: '.'});

        var 
            files = es.merge([configFiles, distFiles])
                .pipe(rename(function (path) {
                    if(storage.folder && storage.folder != '') {
                        path.dirname = '/' + storage.folder + '/' + path.dirname;
                    }
                }));    

        return publish(storage, files);
    });

    gulp.task('app-launch', function () {
        var protocol = conf.samples.https ? "https" : "http";

        gulp.src(['.'])
            .pipe(webserver({
                port: conf.app.port,
                https: conf.app.https,
                //livereload: false,
                //directoryListing: false,
                open: protocol + '://localhost:' + conf.app.port + '/' + conf.dir.dist + 'index.html'
            }));
    });

};