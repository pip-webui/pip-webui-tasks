module.exports = {
    module: {
        name: 'pipModule',
        index: 'index',
        styles: 'styles',
        prefix: '',
        branch: 'master',
        export: null
    },

    dir: {
        temp: './temp/',
        src: './src/',
        test: './test/',
        import: './node_modules/',
        lib: './lib/',
        obj: './obj/',
        objSrc: './obj/src',
        objTest: './obj/test',
        dist: './dist/',
        samples: './samples/',
        cordova: './cordova/',
        doc: './doc/',
        api: './doc/api/'
    },

    file: {
        lib: [
            './bower_components/pip-webui/dist/**/*'
        ],
        def: [
            './typings/**/*.d.ts'
        ],
        res: []
    },

    submodules: [],

    build: {
        js: true,
        ts: true,
        tsd: false,
        bundle: false,
        html: true,
        css: false,
        less: true,
        sass: false,
        lib: true,
        images: true,
        dist: true
    },

    typescript: {
        noImplicitAny: false,
        declaration: true,
        removeComments: true,
        target: 'ES5'
    },

    browserify: {
        debug: true,
        entries: null
    },

    app: {
        port: 8000,
        https: true,
        publish: {
            alpha: {
                type: 'aws',
                bucket: 'my_app_bucket',
                accessKeyId: 'XXXXXXXXXXXXXXXXXXXX',
                secretAccessKey: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
                region: 'us-west-1',
                folder: ''
            },
            beta: {
                type: 'aws',
                bucket: 'my_app_bucket',
                accessKeyId: 'XXXXXXXXXXXXXXXXXXXX',
                secretAccessKey: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
                region: 'us-west-1',
                folder: ''
            },
            prod: {
                type: 'aws',
                bucket: 'my_app_bucket',
                accessKeyId: 'XXXXXXXXXXXXXXXXXXXX',
                secretAccessKey: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
                region: 'us-west-1',
                folder: ''
            }
        }
    },

    samples: {
        port: 8000,
        https: true,
        publish: {
            type: 'aws',
            bucket: 'my_samples_bucket',
            accessKeyId: 'XXXXXXXXXXXXXXXXXXXX',
            secretAccessKey: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
            region: 'us-west-1',
            folder: null
        }
    },

    api: {
        port: 8008,
        https: false,
        publish: {
            bucket: 'my_api_bucket',
            accessKeyId: 'XXXXXXXXXXXXXXXXXXXX',
            secretAccessKey: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
            region: 'us-west-1',
            folder: ''
        }
    },

    eslint: {
        "extends": "standard",
        "env"    : {
            "browser": true,
            "node"   : true,
            "mocha"  : true,
            "jasmine": true
        },
        "parserOptions": {
            "sourceType"  : "script",
            "ecmaFeatures": {}
        },
        "globals": {
            "_"      : true,
            "angular": true,
            "inject" : true,
            "sinon"  : true
        },
        "rules": {
            "no-console"       : 2,
            "no-dupe-keys"     : 2,
            "no-duplicate-case": 2,
            "no-empty"         : [2, { "allowEmptyCatch": true }],
            "no-extra-parens"  : [2, "all"],
            "no-extra-semi"    : 2,
            "no-extra-boolean-cast": 2,
            "no-inner-declarations": [2, "functions"],
            "no-unreachable"   : 2,
            "valid-typeof"     : 2,
            "complexity"       : [2, 10],
            "curly"            : [2, "all"],
            "guard-for-in"     : 1,
            "no-alert"         : 2,
            "no-else-return"   : 1,
            "no-empty-function": 2,
            "no-eq-null"       : 2,
            "no-extend-native" : 2,
            "no-labels"        : 2,
            "no-param-reassign": 2,
            "no-proto"         : 2,
            "no-throw-literal" : 2,
            "one-var"          : [2, "always"],
            "quote-props"      : [2, "as-needed"],
            "strict"           : [2, "function"],
            "wrap-iife"        : [2, "inside"],
            "no-unused-vars"   : [2, { "args": "after-used" }],
            // Style rules
            "block-spacing": 2,
            "brace-style"  : 2,
            "camelcase"    : 2,
            "comma-style"  : [2, "last"],
            "eol-last"     : 2,
            "indent"       : [2, 4, { "SwitchCase": 1, "VariableDeclarator": 1 }],
            "linebreak-style": 2,
            "max-depth"      : [2, {"max": 6}],
            "max-len"        : [2, 120, 4, { "ignoreComments": true, "ignoreUrls": true }],
            "newline-after-var"    : 2,
            "newline-before-return": 2,
            "no-lonely-if"       : 2,
            "no-trailing-spaces" : 2,
            "no-unneeded-ternary": 2,
            "semi"               : [2, "always"],
            "padded-blocks"      : 0,
            "space-before-function-paren": ["error", { "anonymous": "always", "named": "never" }]
        }
    },

    lesslint: {
        "fileExtensions": ["less"],
        "attributeQuotes": {
            "enabled": true
        },
        "borderZero": {
            "enabled": true
        },
        "comment": {
            "enabled": true
        },
        "decimalZero": {
            "enabled": true,
            "style": "none"
        },
        "depthLevel": {
            "enabled": false,
            "depth": 5
        },
        "duplicateProperty": {
            "enabled": true,
            "exclude": ["background-color"]
        },
        "finalNewline": {
            "enabled": true
        },
        "hexLength": {
            "enabled": true,
            "style": "short"
        },
        "importantRule": {
            "enabled": false
        },
        "qualifyingElement": {
            "allowWithAttribute": true,
            "allowWithClass": true
        },
        "selectorNaming": {
            "enabled": true
        },
        "spaceAfterPropertyColon": {
            "enabled": true,
            "style": "one_space"
        },
        "stringQuotes": {
            "enabled": true,
            "style": "double"
        },
        "propertyOrdering": {
            "enabled": false
        },
        "zeroUnit": {
            "style": "no_unit"
        }
    },
    external_libs: []

};