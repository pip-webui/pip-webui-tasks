module.exports = {
    module: {
        name: 'pipModule',
        index: 'index',
        prefix: ''
    },
    dir: {
        temp: './temp/',
        src: './src/',
        test: './test/',
        import: './node_modules/',
        lib: './lib/',
        dist: './dist/',
        samples: './samples/',
        cordova: './cordova/www',
        docs: './doc/api/'
    },
    file: {
        import: [
            // './node_modules/pip-webui-lib/dist/**/*',
            // './node_modules/pip-webui-css/dist/**/*',
            // './node_modules/pip-webui-core/dist/**/*',
            // './node_modules/pip-webui-rest/dist/**/*',
            // './node_modules/pip-webui-layouts/dist/**/*',
            // './node_modules/pip-webui-controls/dist/**/*',
            // './node_modules/pip-webui-nav/dist/**/*',
            // './node_modules/pip-webui-locations/dist/**/*',
            // './node_modules/pip-webui-documents/dist/**/*',
            // './node_modules/pip-webui-pictures/dist/**/*',
            // './node_modules/pip-webui-composite/dist/**/*',
            // './node_modules/pip-webui-entry/dist/**/*',
            // './node_modules/pip-webui-errors/dist/**/*',
            // './node_modules/pip-webui-settings/dist/**/*',
            // './node_modules/pip-webui-help/dist/**/*',
            // './node_modules/pip-webui-guidance/dist/**/*',
            // './node_modules/pip-webui-support/dist/**/*',
            // './node_modules/pip-webui-test/dist/**/*'
        ],
        def: [
            './typings/**/*.d.ts'
        ],
        res: []
    },
    build: {
        js: true,
        ts: true,
        html: true,
        css: true,
        lib: true,
        images: true
    },
    samples: {
        port: 8000,
        publish: {
            bucket: 'webui.pipdevs.com',
            accessKeyId: 'AKIAIEXTTAEEHYPHS3OQ',
            secretAccessKey: 'otMg2vQLZjF4Nkb90j1prtugoUCNm3XqLS/KkHyc',
            region: 'us-west-1'
        }
    },
    docs: {
        port: 8000,
        publish: {
            bucket: 'webui-api.pipdevs.com',
            accessKeyId: 'AKIAIEXTTAEEHYPHS3OQ',
            secretAccessKey: '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',
            region: 'us-west-1'
        }
    },
    external_libs: [
        {dir: './node_modules/prismjs/themes/prism.css', name: 'Prism.js  styles', accurate: true},
        {dir: './node_modules/pip-webui-tasks/node_modules/prismjs/themes/prism.css', name: 'Prism.js styles', accurate: true},
        {dir: './node_modules/prismjs/prism.js', name: 'Prism.js', accurate: true},
        {dir: './node_modules/pip-webui-tasks/node_modules/prismjs/prism.js', name: 'Prism.js', accurate: true}
    ]
};