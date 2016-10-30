module.exports = {
    module: {
        name: 'pipTranslate',
        export: 'pip.translate',
        standalone: 'pip.translate',
        styles: 'styles'
    },
    build: {
        js: false,
        ts: false,
        tsd: true,
        bundle: true,
        html: true,
        css: false,
        less: false,
        sass: true,
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
