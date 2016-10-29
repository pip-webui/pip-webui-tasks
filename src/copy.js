var pkg = require(process.cwd() + '/package.json');
var conf = require('./config');

module.exports = function (gulp) {

    gulp.task('copy-lib', function () {
        if (!conf.build.lib) return;

        return gulp.src(conf.file.import || conf.file.lib)
            .pipe(gulp.dest(conf.dir.lib));
    });

    gulp.task('build-lib', ['copy-lib']);

    gulp.task('copy-images', function () {
        if (!conf.build.images) return;

        return gulp.src(conf.dir.src + '**/images/**/*.*', {base: conf.dir.src})
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

    gulp.task('build-res', ['copy-images', 'copy-index']);

    gulp.task('copy-dist', function () {
        if (!conf.build.dist) return;

        return gulp.src(conf.dir.lib + '**/*.*', {base: conf.dir.lib})
            .pipe(gulp.dest(conf.dir.dist));
    });

    gulp.task('build-dist', ['copy-dist']);

};