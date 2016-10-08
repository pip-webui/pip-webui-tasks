# Pip.WebUI.Tasks Changelog

##1.6.0

Enhanced security in developed applications

### Features

* **samples.js**: Added HTTPS switch (enabled by default)
* **app.js**: Added HTTPS switch (enabled by default)

##1.5.0

Added publish folder name configuration to allow publishing of apps to subfolders on s3

### Features

* **app.js**: Added configurable folder name to publish tasks

## 1.4.0

Added support for iOS and Windows cordova apps

### Features:

* **cordova.js**: added support for Ios and Windows cordova apps. 
* **cordova.js**: adedd parameters in cordova-build-ios tasks: project, scheme, bundle_id, provision

## 1.3.0

Added support for Android cordova apps

### Features:

* **cordova.js**: implemented build tasks for Android platform

## 1.2.0

Added support for application builds

### Features:

* **app.js**: implemented build tasks for application builds

## 1.1.0

Added suppport for complex projects with submodules

### Features:

* **submodules**: tasks to init project, update versions, checkout, checkin and publish

## 1.1.0

Addressing critical security flaw related to storing AWS inside build.conf file in git.
Now all keys shall be kept in a separate build.secret.js file that shall never stored in git.  

Added suppport for application builds.

### Features:

* **build.secret.js**: secret build configuration file to avoid storing sensitive information like AWS key into git
* **app** tasks to launch web browser and publish on S3

### Breaking Changes
* Removed **external_libs**
* Now **lib** files are copied into **dist** folder by default. To stop that set `build.dist = false` in **build.conf**
* API generation is no longer done during build. To add that add it manually into your gulpfile.
* **module.index** property in **build.conf** is renamed to **module.styles**

### Bug Fixes
No fixes in this version


## 1.0.0

Initial release with standard build, test, samples, api and publish tasks

### Features:

* **build** tasks for JavaScript, TypeScript, HTML, CSS/Less, Library, etc.
* **test** tasks with eslint, lesshint and unit tests
* **samples** tasks to launching web browser and publish on S3
* **publish** tasks to publish complex applications on S3
* **cordova** tasks to support cordova builds
* **api** documentation tasks

