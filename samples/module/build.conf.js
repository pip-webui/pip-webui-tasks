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
        port: 8040,
        publish: {
            type: 'azure',
            account: 'bootbarn',
            key: 'v2kj6jjam4IDc5I1aaWiNSjd9mZ6FSz5iqAh9sa8tP3Suk4Big+Xr50tmY15aHdTk8eto9nQwblUZOjUC0Mkwg==',
            container: 'testsite',
            folder: ''
        }
    },
    api: {
        port: 8041
    }
};
