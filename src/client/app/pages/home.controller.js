(function () {
    'use strict';

    angular
        .module('ep.formly.gen.pages')
        .controller('homeController', HomeController);

    HomeController.$inject = ['$scope', '$http', '$state', 'temp', '$ocLazyLoad', '$location', '$window'];

    function HomeController($scope, $http, $state, temp, $ocLazyLoad, $location, $window) {
        var vm = this;
        vm.scriptsHtml = "1";
        vm.scripts = "";
        vm.sections = ['M'];
        vm.mergedJsonWithSections = {};
        vm.params = $state.params;


        vm.themeSelectChange = function (ev) {
            switch (vm.scriptsHtml) {
                case '1':
                    vm.scripts = 'views/bootstrap-scripts.html';
                    break;
                case '2':
                    vm.scripts = 'views/ng-material-scripts.html';
                    break;
                default:
                    break;
            }
        }

        /** Get the Merged JSON using the call below
         * to display the sections
         */

        $http.post('http://localhost:3000/genericdataservice/getFormlyFields/' + vm.params.programname + '/' + vm.params.formname, {
            "action": "getFormlyFields",
            "programName": vm.params.programname,
            "formName": vm.params.formname,
            "params": {
                "isDev": false
            },
            "cachingInfo": {}
        }).then(function (response) {
            vm.mergedJsonWithSections = response.data;
            for (var key in vm.mergedJsonWithSections) {
                if (vm.mergedJsonWithSections.hasOwnProperty(key)) {
                    vm.sections.push(key);
                }
            }
        }, function (response) {

        });

        vm.loadFormlyFieldsForSection = function (section) {
            // var domain = $location.$$protocol + '://' + $location.$$host + ($location.$$port ? ':' + $location.$$port : '') + '/prism/prism.html';
            // $window.open(domain, '_self');

            console.log(vm.mergedJsonWithSections[section]);
            vm.formlyFieldsForPreivew = [{
                    "className": "col-xs-12 col-sm-12 col-md-12",
                    "fieldGroup": [{
                            "className": "pull-right",
                            "type": "ep-button",
                            "templateOptions": {
                                "text": "<div><i class=\"ace-icon fa fa-plus-square bigger-110\"></i>&nbsp;Add Country </div>",
                                "onClick": "formState.upsert(undefined,'INSERT')",
                                "type": "submit",
                                "btnType": "btn btn-sm btn-primary",
                                "title": "This button allows you to Add information"
                            }
                        },
                        {
                            "className": "pull-right no-horizontal-padding",
                            "id": "id_activityButton",
                            "type": "md-button",
                            "templateOptions": {
                                "text": "<i class=\"fa fa-eye bigger-110\"></i>&nbsp;Activity Log",
                                "type": "submit",
                                "formName": "ActivityEntry",
                                "programName": "Olca",
                                "btnType": "primary btn-sm",
                                "ActivityFormName": "Country",
                                "action": "LIST",
                                "title": "This button allows you to view the Activity Log",
                                "modalHeader": "Activity Entries"
                            },
                            "hideExpression": "!model.formData"
                        }
                    ]
                },
                {
                    "template": "<div class=\"col-md-12 col-sm-12 space-4\"></div>"
                }
            ];
        }

        vm.generatorNS = {
            prepareUI: function () {

            },
            toggleJsonDetailsAndSections: function () {
                vm.jsonDetailsHideBool = !vm.jsonDetailsHideBool;
            }
        };


        ////////////////
        activate();

        function activate() {
            switch ($state.params.ui) {
                case 'ace':
                    vm.scripts = 'app/partials/ace-scripts.html';
                    break;
                case 'prism':
                    vm.scripts = 'app/partials/prism-scripts.html';
                    break;
                default:
                    break;
            }
        }
    }
})();