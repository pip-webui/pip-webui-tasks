var _defaultsDeep = require('lodash.defaultsdeep');

var defaultConfig = require('./default_config');
var buildConfig = require(process.cwd() + '/build.conf.js');


var conf = _defaultsDeep(buildConfig, defaultConfig);

module.exports = function() {
    
};