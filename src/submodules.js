var fs = require('fs');
var async = require('async');
var exec = require('child_process').exec;

var argv = require('minimist')(process.argv.slice(2));
var pkg = require(process.cwd() + '/package.json');
var conf = require('./config');

module.exports = function (gulp) {

    function execTask(cwd, command, force) {
        return function(callback) {            
            var options = { cwd: cwd };

            console.log("Executing: '" + command + "' at " + cwd);

            exec(command, options, function(err, stdout, stderr) {
                if (stdout) console.log(stdout);
                if (stderr) console.error(stderr);

                if (!force) callback(err);
                else callback();
            });
        };
    }

    function parentTask(command, force) {
        return execTask(process.cwd(), command, force);
    }

    function submodulesTask(command, force) {
        return function(callback) {
            async.eachSeries(
                conf.submodules, 
                function(submodule, callback) {
                    execTask(process.cwd() + '/' + submodule, command, force)(callback);
                },
                function (err) {
                    callback(err);
                } 
            );
        };
    }

    function submodulesLink() {
        return function(callback) {
            async.eachSeries(
                conf.submodules, 
                function(submodule, callback) {
                    var command = 'mklink /J ' + submodule + '\\node_modules node_modules';
                    execTask(process.cwd(), command, true)(callback);
                },
                function (err) {
                    callback(err);
                } 
            );
        };
    }

    function init() {
        return function(callback) {
            async.series([
                // Clear the modules first to prevent git errors
                function(callback) {
                    async.eachSeries(
                        conf.submodules,
                        function(submodule, callback) {
                            var command = 'rmdir /s /q ' + submodule;
                            execTask(process.cwd(), command, true)(callback);
                        },
                        function (err) {
                            callback(err);
                        }
                    );
                },
                parentTask('git submodule init'),
                parentTask('git submodule update --remote'),
                submodulesTask('git checkout master'),
                submodulesTask('git pull origin master')
            ], callback);
        };        
    }

    function version(version) {
        function updateVersion(file) {
            if (fs.existsSync(file)) {
                console.log("Updating version at '" + file + "'");

                var obj = require(file);
                obj.version = version;

                var content = JSON.stringify(obj, null, 4);
                fs.writeFileSync(file, content);
            }
        }

        return function(callback) {
            var allModules = ['.'];
            allModules = allModules.concat(conf.submodules);

            async.eachSeries(
                allModules, 
                function(submodule, callback) {
                    try {
                        var pkgFile = process.cwd() + '/' + submodule + '/package.json';
                        updateVersion(pkgFile);

                        var bowerFile = process.cwd() + '/' + submodule + '/bower.json';
                        updateVersion(bowerFile);

                        callback();
                    } catch (error) {
                        callback(error);
                    }
                },
                function (err) {
                    callback(err);
                } 
            );
        };
    }

    function checkout() {
        return function(callback) {
            async.series([
                parentTask('git pull origin master'),
                submodulesTask('git pull origin master')
            ], callback);
        }        
    }

    function checkin(message) {
        return function(callback) {
            async.series([
                submodulesTask('git add -A .'),
                submodulesTask('git commit -am "' + message + '"', true),
                submodulesTask('git push'),
                parentTask('git add -A .'),
                parentTask('git commit -am "' + message + '"', true),
                parentTask('git push')
            ], callback);
        };
    }

    function tags() {
        return function(callback) {
            async.series([
                submodulesTask('git tag v' + pkg.version),
                submodulesTask('git push --tags'),
                parentTask('git tag v' + pkg.version),
                parentTask('git push --tags')
            ], callback);
        };        
    }

    function tag() {
        return function(callback) {
            async.series([
                submodulesTask('git tag v' + pkg.version),
                submodulesTask('git push --tags'),
                parentTask('git tag v' + pkg.version),
                parentTask('git push --tags')
            ], callback);
        };        
    }

    gulp.task('submodules-init', init());
    gulp.task('submodules-link', submodulesLink());
    gulp.task('submodules-clean', submodulesTask('gulp clean'));
    gulp.task('submodules-build', submodulesTask('gulp build'));

    gulp.task('submodules-checkout', checkout());
    gulp.task('submodules-checkin', checkin(argv.m || 'Updated submodules'));

    gulp.task('submodules-version', version(argv.v || pkg.version));
    gulp.task('submodules-tag', tag());
    gulp.task('submodules-publish', submodulesTask('npm publish'));

};