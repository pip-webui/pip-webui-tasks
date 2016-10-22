/**
 * @file Registration of all WebUI core services
 * @copyright Digital Living Software Corp. 2014-2016
 */

/// <reference path="../typings/angularjs/angular.d.ts" />

(function () {
    'use strict';

    angular.module('pipCore', [
	    'pipTranslate',
        'pipAssert',
        'pipDebug'
    ]);
    
})();