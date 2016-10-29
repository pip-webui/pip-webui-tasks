var gulp = require('gulp');
var build = require('./build');
var app = require('./app');
var samples = require('./samples');
var cordova = require('./cordova');
var test = require('./test');
var api = require('./api');
var submodules = require('./submodules');

function all(gulp) {
    build(gulp);
    app(gulp);
    samples(gulp);
    cordova(gulp);
    test(gulp);
    api(gulp);
    submodules(gulp);
}

module.exports = all;
module.exports.gulp = gulp;
module.exports.build = build,
module.exports.app = app,
module.exports.samples = samples;
module.exports.cordova = cordova;
module.exports.test = test;
module.exports.api = api;
module.exports.submodules = submodules;
module.exports.all = all;

function browser() {
    return require('./browser');
}

module.exports.browser = browser;