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
        runSequence(['build-js-dev', 'build-tsd', 'build-bundle-dev', 'build-less-dev', 'build-sass-dev', 'build-lib', 'build-res'], 'build-dist',
            callback);
    });

    gulp.task('build-prod', function (callback) {
        runSequence(['build-js-prod', 'build-tsd', 'build-bundle-prod', 'build-less-prod', 'build-sass-prod', 'build-lib', 'build-res'], 'build-dist',
            callback);
    });

    gulp.task('build-clean', function () {
        del([conf.dir.temp, conf.dir.dist, conf.dir.lib, conf.dir.obj]);
    });

    gulp.task('build-watch', function () {
        gulp.watch(conf.dir.src + '**/*', ['rebuild']);
    });

};