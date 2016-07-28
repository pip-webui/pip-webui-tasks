# Pip.WebUI.Tasks Changelog

## 1.1.0 (2016-07-27)

Addressing critical security flaw related to storing AWS inside build.conf file in git.
Now all keys shall be kept in a separate build.secret.js file that shall never stored in git.  

Added suppport for application builds.

### Features:

* **build.secret.js**: secret build configuration file to avoid storing sensitive information like AWS key into git
* **app**: app tasks to launch web browser and publish on S3

### Breaking Changes
* Removed **external_libs**
* Now **lib** files are copied into **dist** folder by default. To stop that set `build.dist = false` in **build.conf**
* API generation is no longer done during build. To add that add it manually into your gulpfile.
* **module.index** property in **build.conf** is renamed to **module.styles**

### Bug Fixes
No fixes in this version


## 1.0.0 (2016-07-25)

Initial release with standard build, test, samples, api and publish tasks

### Features:

* **build**: build tasks for JavaScript, TypeScript, HTML, CSS/Less, Library, etc.
* **test**: test tasks with eslint, lesshint and unit tests
* **samples**: samples tasks to launching web browser and publish on S3
* **publish**: publish tasks to publish complex applications on S3
* **cordova**: cordova tasks to support cordova builds
* **api**: API documentation tasks

