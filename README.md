# Build Tasks for Pip.WebUI Projects

This project provides standard gulp tasks to build Pip.WebUI projects:

* Build deployable artifacts from sources in JavaScript, TypeScript, HTML, CSS/Less 
* Copy external libraries and other resources to the destination folder
* Run tests, validate sources
* Launch and publish sample projects
* Publish final applications

Quick Links:

* [Usage](#usage)
* [Task Reference](#tasks)
* [Configuration](#config)

## <a name="usage"></a> Usage

Using standard build tasks in your projects is pretty easy. There are only 3 simple steps you need to do

### Step 1. Add dependency to pip-webui-tasks in your package.json file

```js
...
"devDependencies": {
    ...
    "pip-webui-tasks": "git+ssh://git@github.com:pip-webui-tasks/pip-webui-tasks.git#master"
    ...
}
...
```

### Step 2. Create build configuration

Project build configuration shall be defined in **build.conf.js** file located in the project root folder.
Typical configuration for your project may look like the sample below:

```js
module.exports = {
    module: { 
        name: 'pipMyModule',
        index: 'my_module'
    },
    build: {
        js: true,
        ts: false,
        html: true,
        css: true,
        lib: true,
        images: true
    },
    samples: {
        port: 8099,
        publish: {
            bucket: 'my_backet',
            accessKeyId: 'XXXXXXXXXXXXXXXXXX',
            secretAccessKey: 'xxxxxxxxxxxxxxxxxxxxxxxxxxx',
            region: 'us-west-1'
        },
    }
};
```

### Step 3. Create gulp file

The main purpose of **gulpfile.js" is to expose standard tasks for the build process.

```js
var gulp = require('gulp');

// Add standard tasks    
require('./tasks').all();

// Define build tasks        
gulp.task('build', ['build-dev', 'build-prod']);
gulp.task('rebuild', ['build-dev']);
gulp.task('clean', ['build-clean']);
gulp.task('watch', ['build-watch']);
gulp.task('jshint', ['test-jshint']);
gulp.task('launch', ['samples-launch']);
gulp.task('publish', ['samples-publish']);

// Set default task
gulp.task('default', ['build']);
```

You can always add your tasks and mix them with the standard ones.

## <a name="tasks"></a> Tasks Reference

### Build tasks

- **build-html-dev** - Takes HTML files, wraps them into JavScript and adds to $templateCache service
- **build-html-prod** - Does the same thing as **build-html-dev** and minifies HTML
- **build-css-dev** - Compiles less scripts into CSS styles. This task uses index less file which references all other less files
- **build-css-prod** - Does the same thing as **build-css-dev** and minifies CSS 
- **build-ts** - Compiles TypeScript files, adds type defiitions and places resulted .js, .map and .d.ts files into temp folder
- **build-js-dev** - Merges all JavaScript files, including wrapped HTML and compiled TypeScript, does annotations, generates .map and places result into dist folder  
- **build-js-prod** - Does the same thing as **build-js-dev** and minifies JavaScript
- **build-res-dev** - Copies resources and 3rd party libraries
- **build-res-prod** - Currently it is identical to **build-res-dev**
- **build-dev** - Combines all development build tasks
- **build-prod** - Combines all production build tasks
- **build-watch** - Watches for changed files in src folder and automatically starts development build
- **build-clean** - Cleans temp and dist folders

## Test tasks

- **test-jshint** - Performs validation of JavaScript source files

## Samples tasks

- **samples-launch** - Launches web-server and web-browser to access samples
- **samples-publish** - Publishes samples to S3-based static website

## <a name="config"></a> Configuration

Build configuration file is broken into few sections

## module section 

Global configuration parameters for the entire project/module
- name: string - Name of Angular module. The name is currently used to set the name for wrapped HTML as &lt;module.name&gt;.Templates
- index: string - Name of index JavaScript and Less files. The index is currently used to set the name of the main Less file as src/&lt;module.index&gt;.less

## dir section

Configuration parameters to set names of standard project folders
- src: string - Source folder where JavaScript, TypeScript, HTML and CSS files and resources are located (default: './src/')
- test: string - Test folder where JavaScript test files are located (default: './test/')
- temp: string - Folder for temporary build artifacts (default: './temp')
- lib: string - Temporary folder where all 3rd party libraries are copied (default: './lib')
- dist: string - Distination folder for produced artifacts (default: './dist')
- samples: string - Folder where samples are located (default: './samples') 

## file section

Configuration parameters for file sets
- import: string[] - Files and folders in 3rd party librarties to copied over to lib and used in testing and samples (default: all pip-webui modules)
- def: string[] - Type definitions which are used to compile TypeScript code (default: all files in typings folder)

## build section

Configuration parameters to control the build process
- js: boolean - Enable JavaScript build (including HTML and TypeScript) (default: true)
- ts: boolean - Enable TypeScript compilation (default: true)
- html: boolean - Enable HTML wrapping (default: true)
- css: boolean - Enable Less to CSS compilation (default: true)
- lib: boolean - Enable copying 3rd party libraries (default: true)
- images: boolean - Enable copying image files (default: true)

## samples section

Configuration parameters to control samples tasks
- port: number - Launched web server port (default: 8000)
- publish: object - S3 bucket properties for samples publishing
  - bucket: string - S3 bucket name
  - accessKeyId: string - Access key for AWS account
  - secretAccessKey: string - Secret access key for AWS account
  - region: string - AWS region where S3 bucket is located

*Thank you for using Pip.WebUI!*