(function ($resource, epGenSettingsVal) {
    'use strict';

    angular
        .module('ep.generic.dataservice')
        .factory('$$epGenericDataFactory', $$epGenericDataFactory);

    $$epGenericDataFactory.$inject = ['$resource', 'epGenSettingsVal'];

    function $$epGenericDataFactory($resource, epGenSettingsVal) {
        return $resource(
            epGenSettingsVal.apiUrl +
            (epGenSettingsVal.isGenericApiSecure ?
                '/securegenericdataservice' :
                '/genericdataservice') +
            '/:action/:programName/:formName/:keyName',
            {
                action: '@action',
                programName: '@programName',
                formName: '@formName',
                keyName: '@keyName'
            },
            {
                'postQuery': { method: 'POST', isArray: true },
                'post': { method: 'POST', isArray: false }
            });
    }
})();
