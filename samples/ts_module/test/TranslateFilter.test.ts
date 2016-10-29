// Example of angular-specific test

import { assert } from 'chai';
import { angular, ngMock, ngModule, ngInject } from './browser';
import '../src/TranslateModule';

suite('TranslateFilter', ()=> {

    test('translate', () => {
        ngModule('pipTranslate');
        ngInject((translateFilter) => {

            // Default language
            assert.equal('English', translateFilter('en'));

        });
   });

});
