'use strict';

import { ITranslateService } from './ITranslateService';

export function translateFilter(pipTranslate: ITranslateService) {
    "ngInject";

    return function (key) {
        return pipTranslate.translate(key) || key;
    }
}

export function optionalTranslateFilter($injector) {
    "ngInject";

    let pipTranslate = $injector.has('pipTranslate') 
        ? $injector.get('pipTranslate') : null;

    return function (key) {
        return pipTranslate  ? pipTranslate.translate(key) || key : key;
    }
}
