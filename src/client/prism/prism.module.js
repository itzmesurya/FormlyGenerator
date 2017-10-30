(function () {
    'use strict';

    angular.module('ep.prism', ['formly',
        'ngSanitize',
        'ui.router',
        'dndLists',
        'jsondiff',
        'ep.formly.theme'
    ]);

    var prismApp = angular.module('ep.prism');
})();