var build = require('./build');
var samples = require('./samples');
var publish = require('./publish');

function all() {
    build();
    samples();
    publish();
}

module.exports = {
    build: build,
    samples: samples,
    publish: publish,
    all: all
};
