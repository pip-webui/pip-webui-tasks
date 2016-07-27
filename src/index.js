var build = require('./build');
var samples = require('./samples');
var cordova = require('./cordova');
var test = require('./test');
var publish = require('./publish');
var api = require('./api');

function all() {
    build();
    samples();
    publish();
    cordova();
    test();
    api();
}

module.exports = all;
module.exports.build = build,
module.exports.samples = samples;
module.exports.publish = publish;
module.exports.cordova = cordova;
module.exports.test = test;
module.exports.api = api;
module.exports.all = all;

