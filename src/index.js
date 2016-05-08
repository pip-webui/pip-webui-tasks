var build = require('./build');
var test = require('./test');
var samples = require('./samples');
var publish = require('./publish');

function all() {
    build();
    test();
    samples();
    publish();
}

module.exports = {
    build: build,
    test: test,
    samples: samples,
    publish: publish,
    all: all    
};