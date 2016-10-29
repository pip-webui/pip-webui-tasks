var runSequence = require('run-sequence');
var del = require('del');

var pkg = require(process.cwd() + '/package.json');
var conf = require('./config');

module.exports = function (gulp) {

    // Add sub tasks
    require('./styles')(gulp);
    require('./html')(gulp);
    require('./typescript')(gulp);
    require('./bundle')(gulp);
    require('./javascript')(gulp);
    require('./copy')(gulp);

    gulp.task('build-dev', function (callback) {
        runSequence(['build-js-dev', 'build-tsd', 'build-bundle', 'build-css-dev', 'build-sass', 'build-lib-dev', 'build-res-dev'], 'build-dist',
            callback);
    });

    gulp.task('build-prod', function (callback) {
        runSequence(['build-js-prod', 'build-tsd', 'build-bundle', 'build-css-prod', 'build-sass', 'build-lib-prod', 'build-res-prod'], 'build-dist',
            callback);
    });

    gulp.task('build-clean', function () {
        del([conf.dir.temp, conf.dir.dist, conf.dir.lib, conf.dir.obj]);
    });

    gulp.task('build-watch', function () {
        gulp.watch(conf.dir.src + '**/*', ['rebuild']);
    });

};