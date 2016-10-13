module.exports = {
    module: {
        name: 'appSample',
        styles: 'styles'
    },
    file: {
        lib: [
            'node_modules/pip-webui-all/dist/**/*'
        ]
    },
    app: {
        publish: {
            alpha: {
                type: 'azure',
                account: 'bootbarn',
                key: 'v2kj6jjam4IDc5I1aaWiNSjd9mZ6FSz5iqAh9sa8tP3Suk4Big+Xr50tmY15aHdTk8eto9nQwblUZOjUC0Mkwg==',
                container: 'testsite',
                folder: ''
            }
        }
    }
};