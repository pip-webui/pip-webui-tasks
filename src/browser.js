'use strict';
var jsdom = require('jsdom').jsdom;

// Mimic browser DOM
global['document'] = jsdom('<html><head><script></script></head><body></body></html>');
global['window'] = global['document'].defaultView;
global['navigator'] = global['window'].navigator = {};
global['Node'] = global['window'].Node;

// We must have that for mock.inject
global['window'].mocha = {};
global['window'].beforeEach = beforeEach;
global['window'].afterEach = afterEach;

// Load angular
require('angular/angular');
require('angular-mocks');

// Override mocks
global['angular'] = global['window'].angular;
global['ngInject'] = global['angular'].mock.inject;
global['ngModule'] = global['angular'].mock.module;
exports.angular = global['window'].angular;
exports.ngMock = global['angular'].mock;
exports.ngInject = exports.ngMock.inject;
exports.ngModule = exports.ngMock.module;

// Load lodash
exports._ = require('lodash');
global['_'] = exports._;
global['window']._ = exports._;

// Load async
exports.async = require('async');
global['async'] = exports.async;
global['window'].async = exports.async;

