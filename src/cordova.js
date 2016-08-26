var gulp = require('gulp');
var runSequence = require('run-sequence');
var es = require('event-stream');
var rename = require('gulp-rename');
var cheerio = require("gulp-cheerio");
var exec = require('child_process').exec;

var pkg = require(process.cwd() + '/package.json');
var conf = require('./config');

module.exports = function () {

    function execTask(cwd, command, force) {
        return function (callback) {
            var options = {cwd: cwd};

            console.log("Executing: '" + command + "' at " + cwd);

            exec(command, options, function (err, stdout, stderr) {
                if (stdout) console.log(stdout);
                if (stderr) console.error(stderr);

                if (!force) callback(err);
                else callback();
            });
        };
    }

    function clean_www() {
        return function (callback) {
            var command = 'rmdir /s /q ' + '"' + conf.dir.cordova + 'www"';
            return execTask(process.cwd(), command, true)(callback);
        };
    }

    function clean_platforms() {
        return function (callback) {
            var command = 'rmdir /s /q ' + '"' + conf.dir.cordova + 'platforms"';
            return execTask(process.cwd(), command, true)(callback);
        };
    }

    function clean_plugins() {
        return function (callback) {
            var command = 'rmdir /s /q ' + '"' + conf.dir.cordova + 'plugins"';
            return execTask(process.cwd(), command, true)(callback);
        };
    }

    function add_android() {
        return function (callback) {
            var command = 'cordova platform add android';
            return execTask(conf.dir.cordova, command, true)(callback);
        };
    }

    function add_windows() {
        return function (callback) {
            var command = 'cordova platform add windows';
            return execTask(conf.dir.cordova, command, true)(callback);
        };
    }

    function add_ios() {
        return function (callback) {
            var command = 'cordova platform add windows';
            return execTask(conf.dir.cordova, command, true)(callback);
        };
    }

    function add_wp8() {
        return function (callback) {
            var command = 'cordova platform add wp8';
            return execTask(conf.dir.cordova, command, true)(callback);
        };
    }

    function add_xwalk() {
        return function (callback) {
            var command = 'cordova plugin add cordova-plugin-crosswalk-webview';
            return execTask(conf.dir.cordova, command, true)(callback);
        };
    }

    function build_android() {
        return function (callback) {
            var command = 'cordova build android --release';
            return execTask(conf.dir.cordova, command, true)(callback);
        };
    }

    function build_windows() {
        return function (callback) {
            var command = 'cordova build windows --release';
            return execTask(conf.dir.cordova, command, true)(callback);
        };
    }


    function build_wp8() {
        return function (callback) {
            var command = 'cordova build wp8 --release';
            return execTask(conf.dir.cordova, command, true)(callback);
        };
    }

    gulp.task('cordova-version', function () {
        return gulp.src([conf.dir.cordova + 'config.xml'])
            .pipe(cheerio({
                run: function ($) {
                    $('widget').attr('version', pkg.version);
                },
                parserOptions: {
                    xmlMode: true
                }
            }))
            .pipe(gulp.dest(conf.dir.cordova));

    });

    gulp.task('cordova-copy-android-beta', function () {
        var
            indexFile = gulp.src(conf.dir.dist + 'index_cordova.html')
                .pipe(rename('index.html')),

            configFile = gulp.src(conf.dir.dist + 'config_beta.js')
                .pipe(rename('config.js')),

            distFiles = gulp.src([
                conf.dir.dist + '**/*',
                '!' + conf.dir.dist + '**/index*.html',
                '!' + conf.dir.dist + '**/config*.js',
                '!' + conf.dir.dist + '**/*.map'], {xbase: '.'});

        return es.merge([indexFile, configFile, distFiles])
            .pipe(gulp.dest(conf.dir.cordova + 'www'));
    });

    gulp.task('cordova-copy-windows-beta', function () {
        var
            indexFile = gulp.src(conf.dir.dist + 'index_windows.html')
                .pipe(rename('index.html')),

            configFile = gulp.src(conf.dir.dist + 'config_beta.js')
                .pipe(rename('config.js')),

            distFiles = gulp.src([
                conf.dir.dist + '**/*',
                '!' + conf.dir.dist + '**/index*.html',
                '!' + conf.dir.dist + '**/config*.js',
                '!' + conf.dir.dist + '**/*.map'], {xbase: '.'});

        return es.merge([indexFile, configFile, distFiles])
            .pipe(gulp.dest(conf.dir.cordova + 'www'));
    });

    gulp.task('cordova-copy-android-prod', function () {
        var
            indexFile = gulp.src(conf.dir.dist + 'index_cordova.html')
                .pipe(rename('index.html')),

            configFile = gulp.src(conf.dir.dist + 'config_production.js')
                .pipe(rename('config.js')),

            distFiles = gulp.src([
                conf.dir.dist + '**/*',
                '!' + conf.dir.dist + '**/index*.html',
                '!' + conf.dir.dist + '**/config*.js',
                '!' + conf.dir.dist + '**/*.map'], {xbase: '.'});

        return es.merge([indexFile, configFile, distFiles])
            .pipe(gulp.dest(conf.dir.cordova + 'www'));
    });

    gulp.task('cordova-copy-android-config', function () {
        return gulp.src([
            conf.dir.cordova + '*.jks',
            conf.dir.cordova + 'release-signing.properties'])
            .pipe(gulp.dest(conf.dir.cordova + 'platforms/android'));
    });

    gulp.task('cordova-copy-ios-config', function () {
        return gulp.src([
            conf.dir.cordova + '*.mobileprovision',
            conf.dir.cordova + 'options.plist'])
            .pipe(gulp.dest(conf.dir.cordova + 'platforms/ios'));
    });

    gulp.task('cordova-clean-www', clean_www());
    gulp.task('cordova-clean-platforms', clean_platforms());
    gulp.task('cordova-clean-plugins', clean_plugins());
    gulp.task('cordova-clean', ['cordova-clean-www', 'cordova-clean-platforms', 'cordova-clean-plugins']);

    gulp.task('cordova-add-android', add_android());
    gulp.task('cordova-add-xwalk', add_xwalk());
    gulp.task('cordova-build-android', build_android());

    gulp.task('cordova-build-android-beta', function (callback) {
        runSequence('cordova-clean', 'cordova-version', 'cordova-copy-android-beta', 'cordova-add-xwalk', 'cordova-add-android',
            'cordova-copy-android-config', 'cordova-build-android', callback);
    });

    gulp.task('cordova-build-android-production', function (callback) {
        runSequence('cordova-clean', 'cordova-version', 'cordova-copy-android-prod', 'cordova-add-xwalk', 'cordova-add-android',
            'cordova-copy-android-config', 'cordova-build-android', callback);
    });
};
