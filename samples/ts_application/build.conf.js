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

    typescript: {
        noImplicitAny: true
    },

    app: {
    }
};