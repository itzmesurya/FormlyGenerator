(function () {
    'use strict';

    angular
        .module('ep.formly')
        .controller('AceAppController', AceAppController);

    AceAppController.$inject = ['$scope'];

    function AceAppController($scope) {
        var vm = this;
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

        activate();

        ////////////////

        function activate() {}
    }
})();