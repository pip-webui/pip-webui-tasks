var fs = require('fs');
var _defaultsDeep = require('lodash.defaultsdeep');

// Load standard configuration files
var defaultConfig = require('./default_config');
var buildConfig = require(process.cwd() + '/build.conf.js');
var conf = _defaultsDeep(buildConfig, defaultConfig);

// Load optional secret configuration files
try {
    var secretPath = process.cwd() + '/build.secret.js';
    var fstat = fs.statSync(secretPath);
    if (fstat.isFile()) {
        var secretConfig = require(secretPath);
        conf = _defaultsDeep(secretConfig, conf);
    }
} catch (error) {
    // Ignore...
}

module.export = conf;
