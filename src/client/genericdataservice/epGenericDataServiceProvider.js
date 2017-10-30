/*global epGenSettingsVal:false */
(function () {
    'use strict';

    angular
        .module('ep.generic.dataservice')
        .provider('$epGenericDataService', EpGenericDataServiceProvider);

    function EpGenericDataServiceProvider() {

        epGenSettingsVal.apiUrl = null;

        this.setApiUrl = function (apiUrl) {
            epGenSettingsVal.apiUrl = apiUrl;
        };

        this.getApiUrl = function () {
            return epGenSettingsVal.apiUrl;
        };

        this.$get = epGenericDataServiceFactory;

        this.init = function (initSettings) {
            if (angular.isObject(initSettings)) {
                angular.extend(epGenSettingsVal, initSettings);
            }
            return this;
        };

        epGenericDataServiceFactory.$inject = ['$q', '$http', '$$epGenericDataFactory',
            'epGenSettingsVal'];

        function epGenericDataServiceFactory($q, $http, $$epGenericDataFactory, epGenSettingsVal) {
            var service = {
                initData: initData,
                getData: getData,
                setData: setData,
                getForm: getForm,
                getFormlyForm:getFormlyForm,
                getRoutes: getRoutes
            };

            var initScope = function () {
                if (epGenSettingsVal.apiUrl === null) {
                    throw ('epGenericDataService error: Please initialize the api Url.');
                }
            };

            return service;

            function initData(programName, formName, initKey, params, cachingInfo) {
                initScope();
                return $$epGenericDataFactory.postQuery({
                    action: 'initData',
                    programName: programName,
                    formName: formName,
                    keyName: initKey,
                    params: params,
                    cachingInfo: epGenSettingsVal.cacheEnabled ? cachingInfo : {}
                });
            }

            function getData(programName, formName, params) {
                initScope();
                return $$epGenericDataFactory.post({
                    action: 'getData',
                    programName: programName,
                    formName: formName,
                    params: params
                });
            }

            function setData(programName, formName, params) {
                initScope();
                return $$epGenericDataFactory.post({
                    action: 'setData',
                    programName: programName,
                    formName: formName,
                    params: params
                });
            }

            function getForm(programName, formName, params, cachingInfo) {
                initScope();
                //enable caching by default if caching info not provided
                if (!cachingInfo) {
                    cachingInfo = { useCache: true };
                }
                return $$epGenericDataFactory.post({
                    action: 'getFormlyFields',
                    programName: programName,
                    formName: formName,
                    params: {
                        isDev: epGenSettingsVal.isDev,
                        applicationName: epGenSettingsVal.applicationName
                    },
                    cachingInfo: (epGenSettingsVal.isDev || !epGenSettingsVal.cacheEnabled) ?
                        {} : cachingInfo
                });
            }
            function getFormlyForm(programName, formName, params, cachingInfo) {
                initScope();
                //enable caching by default if caching info not provided
                if (!cachingInfo) {
                    cachingInfo = { useCache: true };
                }
                return $$epGenericDataFactory.post({
                    action: 'getFormlyFieldsForGenerator',
                    programName: programName,
                    formName: formName,
                    params: {
                        isDev: epGenSettingsVal.isDev,
                        applicationName: epGenSettingsVal.applicationName
                    },
                    cachingInfo: (epGenSettingsVal.isDev || !epGenSettingsVal.cacheEnabled) ?
                        {} : cachingInfo
                });
            }
            function getRoutes(programName, formName, params, cachingInfo) {
                initScope();
                //enable caching by default if caching info not provided
                if (!cachingInfo) {
                    cachingInfo = { useCache: true };
                }
                return $$epGenericDataFactory.post({
                    action: 'getRoutesData',
                    programName: programName,
                    formName: formName,
                    params: params,
                    cachingInfo: epGenSettingsVal.cacheEnabled ? cachingInfo : {}
                });
            }

        }
    }

})();
