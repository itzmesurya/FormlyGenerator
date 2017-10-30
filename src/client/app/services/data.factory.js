(function () {
    'use strict';

    angular
        .module('ep.formly.gen.services')
        .factory('dataFactory', dataFactory);

    dataFactory.$inject = ['$http', '$q'];

    function dataFactory($http, $q) {
        return service;
    }
})();