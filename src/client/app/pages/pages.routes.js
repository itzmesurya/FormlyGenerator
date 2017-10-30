(function () {
    'use strict';

    angular
        .module('ep.formly.gen.pages')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        var states = [{
                state: 'pages',
                config: {
                    abstract: true,
                    template: '<div ui-view></div>',
                    url: '/',
                    title: '',
                    appTitle: '',
                    appFooterTitle: '',
                    settings: {
                        icon: 'compass'
                    }
                }
            },
            {
                state: 'pages.default',
                config: {
                    url: '',
                    templateUrl: 'app/pages/pages.html',
                    controller: 'pagesController',
                    controllerAs: 'vm',
                    title: 'Home'
                }
            },
            {
                state: 'pages.home',
                config: {
                    url: 'home/:programname/:formname/:ui',
                    templateUrl: 'app/pages/home.html',
                    controller: 'homeController',
                    controllerAs: 'vm',
                    title: 'Home',
                    resolve: {
                        temp: function ($stateParams, $ocLazyLoad, $location, $window) {

                            switch ($stateParams.ui) {
                                case 'prism':
                                    var domain = $location.$$protocol + '://' + $location.$$host + ($location.$$port ? ':' + $location.$$port : '') + '/prism/prism.html';
                                    var queryString = '?programname=' + $stateParams.programname + '&formname=' + $stateParams.formname;
                                    $window.open(domain + queryString, '_self');
                                    break;
                                case 'ace':
                                    var domain = $location.$$protocol + '://' + $location.$$host + ($location.$$port ? ':' + $location.$$port : '') + '/aceapp/aceapp.html';
                                    $window.open(domain, '_self');

                                    break;
                                default:
                                    break;
                            }

                        }
                    },
                    params: {
                        ui: {
                            squash: true,
                            value: 'ace'
                        }
                    }
                }
            },
            {
                state: 'pages.layoutpreview',
                config: {
                    url: 'layoutpreview',
                    templateUrl: 'app/pages/layoutpreview.html',
                    controller: 'layoutPreviewController',
                    controllerAs: 'vm',
                    title: 'Formly Preview'
                }
            },
            {
                state: 'pages.external',
                config: {
                    url: 'jsonread',
                    templateUrl: 'prism/pages/jsonread.html'
                }
            }
        ];
        routerHelper.configureStates(states, '/');

    }
})();