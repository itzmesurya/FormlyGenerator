(function () {
    bootstrapApplication();

    function bootstrapApplication() {
        angular.element(document).ready(function () {
            angular.bootstrap(document, ['ep.formly.gen']);
            /** Code to get the prism files and inject them on the fly : RESULT : Failed */
            /** Find the ui component and inject the required scripts into the page */
            var ui = $(location)[0].pathname.split('/')[$(location)[0].pathname.split('/').length - 1];
            switch (ui) {
                case 'prism':
                    var scripts = [
                        '/src/client/app/core/core.module.js',
                        '/src/client/app/pages/pages.module.js',
                        '/src/client/app/directives/directives.module.js',
                        '/src/client/app/partials/partials.module.js',
                        '/src/client/app/services/services.module.js',
                        '/src/client/app/layout/layout.module.js',
                        '/src/client/app/app.config.js',
                        '/src/client/app/app.controller.js',
                        '/src/client/app/core/config.js',
                        '/src/client/app/core/constants.js',
                        '/src/client/app/core/core.route.js',
                        '/src/client/app/pages/home.controller.js',
                        '/src/client/app/pages/layoutpreview.controller.js',
                        '/src/client/app/pages/pages.controller.js',
                        '/src/client/app/pages/pages.routes.js',
                        '/src/client/app/services/data.factory.js',
                        '/src/client/app/layout/shell.controller.js',
                        '/src/client/app/directives/demoPanel/demoPanel.directive.js',
                        '/src/client/app/directives/jsonInputRepeater/jsonInputRepeater.directive.js',
                        'https://epsilonda.github.io/cdn/prism/lib.js',
                        'https://epsilonda.github.io/cdn/prism/prism.min.js',
                        'https://epsilonda.github.io/cdn/prism/app.js'
                    ];
                    // var scripts = ['https://epsilonda.github.io/cdn/prism/lib.js',
                    //     'https://epsilonda.github.io/cdn/prism/prism.min.js',
                    //     'https://epsilonda.github.io/cdn/prism/app.js'
                    // ];
                    var count = 0;
                    /** inject the scripts into the page using jQuery */
                    // scripts.forEach(function (element) {
                    //     angular.module('ep.formly.gen',[]);
                    //     angular.bootstrap(document, ['ep.formly.gen']);
                    //     $.getScript(element,
                    //         function (data, textStatus, jqxhr) {
                    //             console.log('get for :' + element + ' status: ' + textStatus);
                    //             count++;
                    //             if (count === scripts.length) {
                                   
                    //                 angular.module('ep.formly.gen', [
                    //                     /* Shared modules */
                    //                     'ep.formly.gen.core',
                    //                     'ep.formly.gen.layout',
                    //                     'ep.formly.gen.pages',
                    //                     'ep.formly.theme',
                    //                     'oc.lazyLoad',
                    //                     'ep.formly.gen.services',
                    //                     'ep.formly.gen.directives'
                    //                 ]);
                    //             }
                    //         });
                    // }, this);

                    break;
                case 'ace':
                    $('#prism').html();
                    break;
                default:
                    break;
            }


        });
    }
    angular.module('ep.formly.gen', [
        /* Shared modules */
        'ep.formly.gen.core',
        'ep.formly.gen.layout',
        'ep.formly.gen.pages',
        // 'ep.formly.theme',
        'oc.lazyLoad',
        'ep.formly.gen.services',
        'ep.formly.gen.directives'
    ]);

})();