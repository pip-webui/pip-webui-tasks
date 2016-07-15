var build = require('./build');
var samples = require('./samples');
var docs = require('./docs');
var publish = require('./publish');

function all() {
    build();
    samples();
    docs();
    publish();
}

module.exports = {
    build: build,
    samples: samples,
    docs: docs,
    publish: publish,
    all: all
};
