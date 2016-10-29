'use strict';

import { TranslateProvider } from './TranslateProvider';
import { translateDirective } from './TranslateDirective';
import { translateHtmlDirective } from './TranslateDirective';
import { translateFilter } from './TranslateFilter';

angular.module('pipTranslate', [])
    .provider('pipTranslate', TranslateProvider)
    .directive('pipTranslate', translateDirective)
    .directive('pipTranslateHtml', translateHtmlDirective)
    .filter('translate', translateFilter);
