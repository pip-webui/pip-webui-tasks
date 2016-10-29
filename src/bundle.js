var runSequence = require('run-sequence');
var browserify  = require('browserify');
var source      = require('vinyl-source-stream');
var buffer      = require('vinyl-buffer');

var globby = require('globby');
var through = require('through2');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var ngAnnotate = require('gulp-ng-annotate');
var tsify       = require('tsify');

var pkg = require(process.cwd() + '/package.json');
var conf = require('./config');

module.exports = function (gulp) {

    function noop() {
        // just pass-through anything
        return through.obj();
    }

    function buildBundle(production) {
        if (!conf.build.bundle) return;

        if (conf.build.js)
            throw Error("Cannot user build.bundle option together with build.js")
        if (conf.build.ts)
            throw Error("Cannot user build.bundle option together with build.ts")

        var suffix = production ? '.min' : '';
        var compress = production ? uglify : noop;

        // gulp expects tasks to return a stream, so we create one here.
        var bundledStream = through();

        bundledStream
            // turns the output bundle stream into a stream containing
            // the normal attributes gulp plugins expect.
            .pipe(source(pkg.name + suffix + '.js'))
            // the rest of the gulp task, as you would normally write it.
            // here we're copying from the Browserify + Uglify2 recipe.
            .pipe(buffer())
            .pipe(ngAnnotate({single_quotes: true, add: true, remove: true}))
            .pipe(sourcemaps.init({loadMaps: true}))
            // Add gulp plugins to the pipeline here.
            .pipe(compress())
            .pipe(sourcemaps.write('.'))
            .pipe(gulp.dest(conf.dir.dist));

        // "globby" replaces the normal "gulp.src" as Browserify
        // creates it's own readable stream.
        globby(
            [
                conf.dir.src + '**/*.js',
                conf.dir.src + '**/*.ts',
                conf.dir.temp + pkg.name + '-html' + suffix + '.js',
                '!' + conf.dir.src + 'config*.js',
                '!' + conf.dir.src + 'cordova*.js'
            ])
            .then(function(entries) {
                var browserifyOpts = conf.browserify || {};
                browserifyOpts.debug = true;
                browserifyOpts.entries = entries;

                var typescriptOpts = conf.typescript || {};

                // create the Browserify instance.
                browserify(browserifyOpts)
                // pipe the Browserify stream into the stream we created earlier
                // this starts our gulp pipeline.
                .plugin(tsify, typescriptOpts)
                .bundle()
                .pipe(bundledStream);
            });

        // finally, we return the stream, so gulp knows when this task is done.
        return bundledStream;
    }

    gulp.task('build-bundle-dev', ['build-html-dev'], function () {
        buildBundle(false);
    });

    gulp.task('build-bundle-prod', ['build-html-prod'], function () {
        buildBundle(true);
    });
  
};