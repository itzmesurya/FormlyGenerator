(function () {
    'use strict';

    angular
        .module('demo')
        .controller('epTextDemoController', epTextDemoController);

    epTextDemoController.$inject = ['$scope', '$log', '$q', '$timeout', '$sce', '$compile', '$mdDialog'];

    function epTextDemoController($scope, $log, $q, $timeout, $sce, $compile, $mdDialog) {
        $scope.name = 'epTextDemoController';
        //alert('Demo controller has been loaded!');
        var dc = this;
        dc.name = 'Surya';

        dc.formModel = {
            'phone': '998-458-1245',
            'email': 'test@test.com'
        };

        dc.userFields = [{
                key: 'testVal',
                id: 'testVal',
                type: 'ep-text',
                templateOptions: {
                    label: 'testVal',
                    maxlength: 30,
                    minlength: 10,
                    required: true
                },
                validation: {
                    messages: {
                        required: '"testVal is required"',
                        maxlength:'"too long"',
                        minlength:'"too short"'
                    }
                }
            },
            {
                key: 'phone',
                id: 'phone',
                type: 'md-input',
                templateOptions: {
                    label: 'Phone',
                    required: true,
                    maxlength: 30,
                    minlength: 2,
                    mask: '(999)999-9999'
                },
                validation: {
                    messages: {
                        required: '\"Phone is required\"',
                        pattern: '\"Invalid Phone Expected Format : xxx-xxx-xxxx\"'
                    }
                }
            },
            {
                key: 'email',
                type: 'ep-text',
                templateOptions: {
                    label: 'Email',
                    required: true,
                    validationType: 'email'
                },
                validation: {
                    messages: {
                        required: '\"Email is required\"',
                        pattern: '\"Invalid Phone Expected Format : xxx-xxx-xxxx\"'
                    }
                }
            }
        ];

    }
})();