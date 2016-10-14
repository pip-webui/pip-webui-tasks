module.exports = {
    module: {
        name: 'pipCore',
        styles: 'core'
    },
    build: {
        js: true,
        ts: true,
        html: false,
        css: false,
        lib: true,
        images: false,
        dist: false
    },
    file: {
        lib: [
            './node_modules/pip-webui-lib/dist/**/*'
        ]
    },
    samples: {
        port: 8040
    },
    api: {
        port: 8041
    }
};
