(function () {
    'use strict';

    angular.module('ep.prism', ['formly',
        'ngSanitize',
        'ui.router',
        'dndLists',
        'jsondiff',
        'ep.generic.dataservice',        
        'ep.formly.theme'
    ]).config(['$epGenericDataServiceProvider', function ($epGenericDataServiceProvider) {
        $epGenericDataServiceProvider.init({
            apiUrl: 'http://localhost:3000',
            isGenericApiSecure: false,
            cacheEnabled: true,
            wordcheck: false
        });
    }]);

    var prismApp = angular.module('ep.prism');
})();