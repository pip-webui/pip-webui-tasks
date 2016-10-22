/// <reference path="../typings/typings.d.ts" />

module appSample {

    function config (
            $stateProvider: angular.ui.IStateProvider, 
            $mdIconProvider: angular.material.IIconProvider, 
            pipAppBarProvider: any, 
            pipSideNavProvider: any
    ) {
        // Load default iconset
        $mdIconProvider.iconSet('icons', 'images/icons.svg', 512);

        // Define global secondary actions (for actions popup menu) 
        pipAppBarProvider.globalSecondaryActions([
            {name: 'global.settings', title: 'Settings', state: 'settings'},
            {name: 'global.signout', title: 'Sign out', state: 'signout'}
        ]);

        // Configure global navigation
        pipSideNavProvider.sections([
            {
                links: [
                    {title: 'Settings', state: 'settings'},
                    {title: 'Sign out', state: 'signout'}
                ]
            }
        ]);

        // Configure states of application

        // Set default application title
        pipAppBarProvider.appTitleText('Application Sample');
    }

    class Controller {
        constructor(
            $scope: angular.IScope, 
            pipAppBar: any
        ) {
            // Show application title
            pipAppBar.showAppTitleText('Application Sample');     
            // Show icon to open sidenav
            pipAppBar.showMenuNavIcon();
            // Show button with tree dots for secondary actions
            pipAppBar.showLocalActions();
        }

        public greetings = "Hello World from TS!";

        public throwException(): never {
            throw new Error("Test Exception");
        }
    }

    angular
        .module('appSample', [
            // pipWebUI modules
            'pipRest', 
            'pipLayout', 
            'pipAppBar', 
            'pipSideNav', 
            'pipErrorHandling',

            // Application templates
            'appSample.Templates'
        ])
        .config(config)
        .controller('appSample.Controller', Controller);

}