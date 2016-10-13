var app = angular.module('appSample', [
        // pipWebUI modules
        'pipRest', 'pipLayout', 'pipAppBar', 'pipSideNav', 'pipErrorHandling',

        // Application templates
        'appSample.Templates'
]);

app.config(function(pipStateProvider, $mdIconProvider, pipAppBarProvider, pipSideNavProvider) {
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
});

app.controller('appSampleController', function($scope, pipAppBar) {
    // Show application title
    pipAppBar.showAppTitleText('Application Sample');     
    // Show icon to open sidenav
    pipAppBar.showMenuNavIcon();
    // Show button with tree dots for secondary actions
    pipAppBar.showLocalActions();
});