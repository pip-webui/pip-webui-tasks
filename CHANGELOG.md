# Pip.WebUI.Tasks Changelog

## 1.1.0 (2016-07-27)

Addressing critical security flaw related to storing AWS inside build.conf file in git.
Now all keys shall be kept in a separate build.secret.js file that shall never stored in git.  

### Features:

* **build.secret.js**: secret build configuration file to avoid storing sensitive information like AWS key into git

## 1.0.0 (2016-07-25)

Initial release with standard build, test, samples, api and publish tasks

### Features:

* **build**: Build tasks for JavaScript, TypeScript, HTML, CSS/Less, Library, etc.
* **test**: Test tasks with eslint, lesshint and unit tests
* **samples**: Samples tasks to launching web browser and publish on S3
* **publish**: Publish tasks to publish complex applications on S3
* **cordova**: Cordova tasks to support cordova builds
* **api**: API documentation task

### Breaking Changes
No breaking changes in this version

### Bug Fixes
No fixes in this version
