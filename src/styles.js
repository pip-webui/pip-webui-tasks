var concat = require('gulp-concat');
var less = require('gulp-less');
var sass = require('gulp-sass');
var minifyCss = require('gulp-clean-css');
var sourcemaps = require('gulp-sourcemaps');

var pkg = require(process.cwd() + '/package.json');
var conf = require('./config');

module.exports = function (gulp) {

    gulp.task('build-less-dev', function () {
        if (!conf.build.css && !conf.build.less) return;

        return gulp.src(conf.dir.src + conf.module.styles + '.less')
            .pipe(less())
            .pipe(concat(pkg.name + '.css'))
            .pipe(gulp.dest(conf.dir.dist));
    });

    gulp.task('build-less-prod', function () {
        if (!conf.build.css && !conf.build.less) return;

        return gulp.src(conf.dir.src +  conf.module.styles + '.less')
            .pipe(less())
            .pipe(minifyCss())
            .pipe(concat(pkg.name + '.min.css'))
            .pipe(gulp.dest(conf.dir.dist));
    });

    gulp.task('build-sass-dev', function () {
        if (!conf.build.sass) return;

        return gulp.src(conf.dir.src +  conf.module.styles + '.scss')
            .pipe(sourcemaps.init())
            .pipe(sass())
            .pipe(concat(pkg.name + '.css'))
            .pipe(sourcemaps.write('.'))
            .pipe(gulp.dest(conf.dir.dist));
    });

    gulp.task('build-sass-prod', function () {
        if (!conf.build.sass) return;

        return gulp.src(conf.dir.src +  conf.module.styles + '.scss')
            .pipe(sourcemaps.init())
            .pipe(sass({outputStyle: 'compressed'}))
            .pipe(concat(pkg.name + '.min.css'))
            .pipe(sourcemaps.write('.'))
            .pipe(gulp.dest(conf.dir.dist));
    });

};