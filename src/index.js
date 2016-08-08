var build = require('./build');
var app = require('./app');
var samples = require('./samples');
var cordova = require('./cordova');
var test = require('./test');
var publish = require('./publish');
var api = require('./api');
var submodules = require('./submodules');

function all() {
    build();
    app();
    samples();
    publish();
    cordova();
    test();
    api();
    submodules();
}

module.exports = all;
module.exports.build = build,
module.exports.app = app,
module.exports.samples = samples;
module.exports.publish = publish;
module.exports.cordova = cordova;
module.exports.test = test;
module.exports.api = api;
module.exports.submodules = submodules;
module.exports.all = all;

