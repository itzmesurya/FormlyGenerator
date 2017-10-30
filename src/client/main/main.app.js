(function () {
    'use strict';

    angular.module('main', [
        /* Vendor modules */
        'ngRoute',
        'ngMaterial',
        'formly',

        /*Custom modules */
        'demo',
        'directives',
        'ep.formly.themes'
    ]);

    var mainApp = angular.module('main');

    mainApp.config(function ($routeProvider, $locationProvider) {
        $routeProvider.when('/', {
            templateUrl: 'demo/ep-text/ep-text-demo.html',
            controller: 'epTextDemoController as dc'
        });
        $routeProvider.when('/demo', {
            templateUrl: 'demo/demo.html',
            controller: 'demoController as dc'
        });

        $locationProvider.html5Mode(true);
    });
})();