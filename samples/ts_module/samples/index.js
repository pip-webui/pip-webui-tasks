/* global angular */

(function () {
    'use strict';

    var thisModule = angular.module('app', [ 'pipTranslate' ]);

    thisModule.config(function (pipTranslateProvider) {
        // This is used for translate sample
        pipTranslateProvider.setTranslations('en', {
            SCOPE1_TEXT: 'This is English text from one scope'
        });
        pipTranslateProvider.setTranslations('en', {
            SCOPE2_TEXT: 'This is English text from another scope',
            SCOPE3_TEXT: 'This is an <b>HTML</b> from <i>another</i> scope'
        });
        pipTranslateProvider.setTranslations('ru', {
            SCOPE1_TEXT: 'Это Русский текст из одного места'
        });
        pipTranslateProvider.setTranslations('ru', {
            SCOPE2_TEXT: 'Это Русский текст из другого места',
            SCOPE3_TEXT: 'Это фрагмент <b>HTML</b> из <i>другого</i> места'
        });
    });

    thisModule.controller('AppController', 
        function ($scope, pipTranslate) {

            $scope.setLanguage = function(language) {
                console.log("Set language to " + language);
                pipTranslate.use(language);
            };

        }
    );

})();
