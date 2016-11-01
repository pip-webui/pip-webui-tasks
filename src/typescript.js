var concat = require('gulp-concat');
var ts = require('gulp-typescript');
var sourceMaps = require('gulp-sourcemaps');
var merge = require('merge2');
var replace = require('gulp-replace');
var insert = require('gulp-insert');

var pkg = require(process.cwd() + '/package.json');
var conf = require('./config');

module.exports = function (gulp) {

    gulp.task('build-ts', function () {
        if (!conf.build.ts) return;

        var tsFiles = [
            conf.dir.src + '**/*.ts'
        ].concat(conf.file.def || []);

        var tsResult = gulp.src(tsFiles)
            .pipe(sourceMaps.init())
            .pipe(ts(conf.typescript));

        return merge([
            tsResult.dts
                .pipe(replace(/\/\/\/.*<reference.*>/gi, ''))
                .pipe(replace(/^\s*[\r\n]/gm,''))
                .pipe(replace(/^\s*[\r\n]/gm,''))
                .pipe(concat(pkg.name + '.d.ts'))
                .pipe(gulp.dest(conf.dir.dist)),
            tsResult.js
                .pipe(concat(pkg.name + '-ts.js'))
                .pipe(sourceMaps.write('.'))
                .pipe(gulp.dest(conf.dir.temp))
        ]);
    });

    gulp.task('build-tsd', function () {
        if (!conf.build.tsd) return;

        var tsFiles = [
            conf.dir.src + '**/*.ts'
        ].concat(conf.file.def || []);

        var file = gulp.src(tsFiles)
            .pipe(ts(conf.typescript))
            .dts
                .pipe(replace(/\/\/\/.*<reference.*>/gi, ''))
                .pipe(replace(/import[^;]+[\'\"]\..*[\'\"];/gi, ''))
                .pipe(replace(/export[^;]+[\'\"]\..*[\'\"];/gi, ''))
                .pipe(replace(/declare /gi, ''))
                .pipe(replace(/^\s*[\r\n]/gm,''))
                .pipe(replace(/^\s*[\r\n]/gm,''))
                .pipe(concat(pkg.name + '.d.ts'));
        
        if (conf.module.export) {
            file = file.pipe(insert.wrap(
                'declare module ' + conf.module.export + ' {\n\r',
                '\n\r}\n\r'
            ));
        }

        return file.pipe(gulp.dest(conf.dir.dist));
    });

};