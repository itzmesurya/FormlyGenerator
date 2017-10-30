(function () {
    'use strict';

    angular
        .module('ep.prism')
        .controller('PrismController', PrismController);

    PrismController.$inject = ['$scope', '$location', '$http', '$window', '$mdDialog'];

    function PrismController($scope, $location, $http, $window, $mdDialog) {
        var vm = this;
        vm.getUrlParameter = function (param, dummyPath) {
            var sPageURL = dummyPath || window.location.search.substring(1),
                sURLVariables = sPageURL.split(/[&||?]/),
                res;

            for (var i = 0; i < sURLVariables.length; i += 1) {
                var paramName = sURLVariables[i],
                    sParameterName = (paramName || '').split('=');

                if (sParameterName[0] === param) {
                    res = sParameterName[1];
                }
            }

            return res;
        }
        var programname = vm.getUrlParameter('programname');
        var formname = vm.getUrlParameter('formname');
        vm.details = {
            programName: programname,
            formName: formname
        };
        vm.mergedJsonWithSections = {};
        vm.sections = [];

        $http.post('http://localhost:3000/genericdataservice/getFormlyFields/' + programname + '/' + formname, {
            "action": "getFormlyFields",
            "programName": programname,
            "formName": formname,
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


        vm.formlyFieldsForPreivew = [{
                "key": "button",
                "id": "Button1",
                "type": "ep-button",
                "templateOptions": {
                    "templateType": "field",
                    "class": "md-raised md-primary",
                    "title": "Button",
                    "label": "Button",
                    "onClick": "formState.onClick(model)"
                }
            },
            {
                "key": "person",
                "id": "person",
                "type": "ep-auto-complete",
                "templateOptions": {
                    "label": "AutoComplete",
                    "templateType": "field",
                    "minLength": 13,
                    "maxLength": 34,
                    "required": true,
                    "displayProperty": "name",
                    "isDisabled": false,
                    "noCache": true,
                    "placeholder": "Select a person",
                    "resource": {
                        "apiUrl": "/api/filterJson",
                        "postObj": {
                            "filename": "piggybank",
                            "propname": "name"
                        }
                    },
                    "data": [{
                            "index": 8,
                            "name": "Michael Huffman",
                            "age": 24,
                            "balance": "$2,028.75"
                        },
                        {
                            "index": 9,
                            "name": "Bartlett Baird",
                            "age": 32,
                            "balance": "$2,787.56"
                        },
                        {
                            "index": 10,
                            "name": "Baird Mccray",
                            "age": 23,
                            "balance": "$2,090.15"
                        },
                        {
                            "index": 11,
                            "name": "Barker Hall",
                            "age": 25,
                            "balance": "$1,022.24"
                        }
                    ]
                },
                "validation": {
                    "messages": {
                        "required": "'Person is required'",
                        "minlength": "'Min length error'",
                        "maxlength": "'Max length error'"
                    }
                }
            }
        ];
        activate();

        ////////////////

        function activate() {}


        var vm = this;
        var _ = $window._;
        vm.models = {
            selected: null
        };

        vm.formlyTemplatesList = [];

        vm.formlyTemplatesList.push({
            type: 'ep-text',
            className: 'layout-padding',
            templateOptions: {
                label: 'TextBox',
                templateType: 'field',
                required: true,
                maxlength: 30,
                minlength: 10,
                disabled: true,
                placeholder: 'placeholder here...',
                noFloat: true,
                validator: 'phone'
            },
            validation: {
                messages: {
                    required: '"Field is required"',
                    pattern: '"Invalid Phone Expected Format : xxx-xxx-xxxx"',
                    'md-maxlength': '"Max length is reached"',
                    minlength: '"Minimim Characters Required"'
                }
            }

        });

        vm.formlyTemplatesList.push({
            type: 'ep-dropdown',
            className: 'layout-padding',
            templateOptions: {
                label: 'DropDown',
                templateType: 'field',
                options: [{
                    id: 0,
                    Name: 'TestValue'
                }],
                required: true,
                valueProp: 'id',
                labelProp: 'Name',
                multiple: false,
                defaultRequired: true,
                enableSearch: true
            },
            expressionProperties: {},
            validation: {
                messages: {
                    required: '\"Please select an option\"'
                }
            }
        });

        vm.formlyTemplatesList.push({
            key: 'button',
            id: 'Button1',
            type: 'ep-button',
            templateOptions: {
                templateType: 'field',
                class: 'md-raised md-primary',
                title: 'Button',
                label: 'Button',
                onClick: 'formState.onClick(model)'
            }
        });

        vm.formlyTemplatesList.push({
            key: 'person',
            id: 'person',
            type: 'ep-auto-complete',
            templateOptions: {
                label: 'AutoComplete',
                templateType: 'field',
                minLength: 13,
                maxLength: 34,
                required: true,
                displayProperty: 'name',
                isDisabled: false,
                noCache: true,
                placeholder: 'Select a person',
                resource: {
                    apiUrl: '/api/filterJson',
                    postObj: {
                        filename: 'piggybank',
                        propname: 'name'
                    }
                },
                data: [{
                        'index': 8,
                        'name': 'Michael Huffman',
                        'age': 24,
                        'balance': '$2,028.75'
                    },
                    {
                        'index': 9,
                        'name': 'Bartlett Baird',
                        'age': 32,
                        'balance': '$2,787.56'
                    },
                    {
                        'index': 10,
                        'name': 'Baird Mccray',
                        'age': 23,
                        'balance': '$2,090.15'
                    },
                    {
                        'index': 11,
                        'name': 'Barker Hall',
                        'age': 25,
                        'balance': '$1,022.24'
                    }
                ]
            },
            validation: {
                messages: {
                    required: '\'Person is required\'',
                    minlength: '\'Min length error\'',
                    maxlength: '\'Max length error\''
                }
            }
        });

        vm.formlyTemplatesList.push({
            key: 'notifications',
            id: 'notifications',
            type: 'ep-checkbox',
            templateOptions: {
                label: 'CheckBox',
                templateType: 'field',
                required: true,
                islist: false,
            },
            validation: {
                messages: {
                    required: 'Notifications is required'
                }
            }
        });

        vm.formlyTemplatesList.push({
            key: 'DatePicker',
            type: 'ep-datepicker',
            id: 'EmployeeDOB',
            className: 'flex-100',
            templateOptions: {
                templateType: 'field',
                label: 'DatePicker',
                options: [],
                required: true,
                defaultRequired: true,
                disable: true,
                format: 'yyyy/MM/dd',
                minDate: '1/1/2015',
                maxDate: '1/1/2020',
                disabled: false
            },
            validation: {
                messages: {
                    required: '\"DOB is required\"',
                    mindate: '\"minDate is required\"'
                }
            }
        });

        vm.formlyTemplatesList.push({
            fieldGroup: [],
            className: 'layout-column',
            templateOptions: {
                type: 'Formly FieldGroup',
                label: 'fieldgroup',
                templateType: 'fieldgroup'
            }
        });

        //fieldgroup-col
        vm.formlyTemplatesList.push({
            fieldGroup: [],
            className: 'layout-row',
            templateOptions: {
                type: 'Formly FieldGroup',
                label: 'fieldgroup-column-container',
                templateType: 'fieldgroup-col'
            }
        });

        vm.formlyTemplatesList.push({
            template: '<div></div>'
        });

        vm.dropZoneCollectionListWithFieldGroups = [];

        vm.formlyFieldsForPreivew = [];

        vm.spliceItem = function (e) {
            console.log(e);
        }

        vm.remove = function (item) {
            console.log($scope);
            console.log(item);
        }
        /** on click of a section load the particular JSON field into the formly generator */
        vm.loadSectionJson = function (section) {
            vm.dropZoneCollectionListWithFieldGroups = vm.mergedJsonWithSections[section];
        }

        $scope.$watch('vm.dropZoneCollectionListWithFieldGroups', function (dropZoneCollectionListWithFieldGroups) {
            vm.formlyFieldsForPreivew = angular.copy(dropZoneCollectionListWithFieldGroups);
            vm.formlyFieldsForTextArea = JSON.stringify(angular.copy(dropZoneCollectionListWithFieldGroups), undefined, 2);
        }, true);

        vm.deepSeacrhAndRemove = function (item, ev) {
            deepSearch(item, vm.dropZoneCollectionListWithFieldGroups, '$$hashKey');
            ev.stopPropagation();
        }

        vm.deepSearchAndAssignFieldGroup = function (item, rowOrColCount) {
            deepSearchAndAssignFG(item, vm.dropZoneCollectionListWithFieldGroups, '$$hashKey', rowOrColCount);
        }
        vm.fieldDragStart = function () {
            vm.hideFieldsArrayPanels = true;
            vm.hideFieldsPanels = true;
        }

        vm.fieldDragEnd = function () {
            vm.hideFieldsArrayPanels = false;
            vm.hideFieldsPanels = false;
        }

        vm.fieldGroupDragEnd = function (item, ev) {
            vm.hideFieldsArrayPanels = false;
            vm.hideFieldsPanels = false;

            if (item.templateOptions && item.templateOptions.templateType) {
                switch (item.templateOptions.templateType) {
                    case 'field':
                        break;
                    case 'fieldgroup':
                        //alert('This is going to take care of the columns in the fieldgroup');
                        break;
                    case 'fieldgroup-col':
                        // create a modal pop-up to know how many columns needed
                        break;
                    default:
                        break;
                }
            }

        }
        vm.copyFieldArrayFromText = function (ev) {
            $('#fieldsTextArea').select();
            if (document.execCommand('copy')) {
                $mdDialog.show(
                    $mdDialog.alert()
                    .clickOutsideToClose(true)
                    .title('Copy Result')
                    .textContent('Fields array has been copied.')
                    .ariaLabel('Copy Result Dialog')
                    .ok('Got it!')
                    .targetEvent(ev)
                );
            } else {
                $mdDialog.show(
                    $mdDialog.alert()
                    .clickOutsideToClose(true)
                    .title('Copy Result')
                    .textContent('Fields array could not be copied. Try again or manually try copying it')
                    .ariaLabel('Copy Result Dialog')
                    .ok('Got it!')
                    .targetEvent(ev)
                );
            }
            $('#fieldsTextArea').blur();
        }
        vm.reset = function (event) {
            vm.dropZoneCollectionListWithFieldGroups = [];
            vm.fieldFilterText = "";
        }
        vm.showHideFields = function () {
            vm.hideFieldsPanels = !vm.hideFieldsPanels;
        }

        vm.showHideFieldsArray = function () {
            vm.hideFieldsArrayPanels = !vm.hideFieldsArrayPanels;
        }

        vm.showCustomFieldsModal = function (ev) {
            $mdDialog.show({
                    controller: CustomFieldsModalDialogController,
                    controllerAs: 'cfd',
                    templateUrl: 'custom-fields-modal-dialog.html',
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose: false,
                    fullscreen: true, // Only for -xs, -sm breakpoints.
                    locals: {}
                })
                .then(function (dataFromDialog) {
                    if (dataFromDialog) {
                        vm.dropZoneCollectionListWithFieldGroups = dataFromDialog;
                    }
                }, function () {
                    // $scope.status = 'You cancelled the dialog.';
                });
            ev.stopPropagation();
        }

        CustomFieldsModalDialogController.$inject = ['$scope', '$mdDialog'];

        function CustomFieldsModalDialogController($scope, $mdDialog) {
            var cfd = this;
            cfd.showError = false;
            cfd.hide = function () {
                $mdDialog.hide();
            };

            cfd.cancel = function () {
                $mdDialog.cancel();
            };
            cfd.openError = function (errorMsg, jsonInContext) {
                cfd.showError = true;
                cfd.errorMsg = errorMsg;
                cfd.errorJson = JSON.stringify(jsonInContext, undefined, 2);
            }
            cfd.closeError = function () {
                cfd.showError = false;
                cfd.formlyFieldsForTextArea = undefined;
            }
            cfd.passFields = function () {
                var returnObj = undefined;
                returnObj = cfd.validateJson(cfd.formlyFieldsForTextArea);
                if (returnObj) {
                    $mdDialog.hide(returnObj);
                }
            };

            cfd.customFieldsTextAreaChange = function () {
                // try {
                //     cfd.formlyFieldsForTextArea = JSON.stringify(JSON.parse(cfd.formlyFieldsForTextArea));
                // } catch (error) {

                // }

            }

            cfd.closeCustomFieldsDialog = function () {
                cfd.showError = false;
                cfd.formlyFieldsForTextArea = undefined;
                $mdDialog.hide();
            }
            cfd.validateJson = function (jsonString) {
                var returnObj = undefined;
                try {
                    returnObj = JSON.parse(jsonString);
                    if (returnObj) {
                        /**check if it is an object
                         * else assign it to an array.
                         */

                        /** Rules
                         * 1. Must be an array or an object.
                         * 2. If it is an object, then it must contain 
                         * object.templateOptions and object.templateOptions.templateType 
                         * and object.templateOptions.templateType must be equal to either 'field' or 
                         * 'fieldgroup' or 'fieldgroup-col'
                         * else it must contain object.template
                         */
                        if (returnObj.constructor === [].constructor) {
                            returnObj.forEach(function (element) {
                                if (!cfd.validateField(element)) {
                                    cfd.showError = true;
                                    returnObj = undefined;
                                    return returnObj;
                                }
                            });
                        } else if (returnObj.constructor === {}.constructor) {
                            if (cfd.validateField(returnObj)) {
                                var temp = angular.copy(returnObj);
                                returnObj = [];
                                returnObj.push(temp);
                            } else {
                                returnObj = undefined;
                            }
                        }
                    }
                } catch (error) {
                    cfd.showError = true;
                    console.log(error);
                }
                return returnObj;
            }
            cfd.scrollToError = function () {
                $('.errors-dialog md-dialog-content').scrollTop(0);
            }
            cfd.validateField = function (fieldJson) {
                var result = true;
                var validTemplatetypes = ['field', 'fieldgroup', 'fieldgroup-col'];
                if (fieldJson.template) {
                    result = true;
                } else if (fieldJson.templateOptions && fieldJson.templateOptions.templateType) {
                    if (validTemplatetypes.indexOf(fieldJson.templateOptions.templateType) > -1) {
                        if (fieldJson.fieldGroup) {
                            cfd.validateJson(JSON.stringify(fieldJson.fieldGroup));
                        }
                    } else {
                        result = false;
                        cfd.openError('field.templateOptions.templateType must be either "field", "fieldgroup" or "fieldgroup-col".', fieldJson);
                        cfd.scrollToError();
                    }
                } else {
                    result = false;
                    cfd.openError('field must contain either "template" or "templateOptions" with "templateType" as one of its properties.', fieldJson);
                    cfd.scrollToError();
                }

                return result;
            }
        }

        var deepSearch = function (item, array, attr) {
            array.forEach(function (element) {
                if (element[attr] === item[attr]) {
                    array.splice(array.indexOf(item), 1);
                } else {
                    if (element.fieldGroup && element.fieldGroup.length > 0) {
                        /** search the array inside the fieldGroup */
                        deepSearch(item, element.fieldGroup, attr);
                    } else {
                        if (element[attr] === item[attr]) {
                            array.splice(array.indexOf(item), 1);
                        }
                    }
                }

            });
        }

        var deepSearchAndAssignFG = function (item, array, attr, rowOrColCount) {
            array.forEach(function (element) {
                if (element[attr] === item[attr]) {
                    for (var index = 0; index < rowOrColCount; index++) {
                        var fgItem = angular.copy(_.findWhere(vm.formlyTemplatesList, {
                            type: 'Formly FieldGroup'
                        }));
                        element.fieldGroup.push(fgItem);
                    }
                } else {
                    if (element.fieldGroup && element.fieldGroup.length > 0) {
                        deepSearchAndAssignFG(item, element.fieldGroup, attr);
                    }
                }
            });
        }

        vm.showConfigModal = function (ev, item) {
            $mdDialog.show({
                    controller: DialogController,
                    controllerAs: 'd',
                    templateUrl: 'field-modal.html',
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose: false,
                    fullscreen: true, // Only for -xs, -sm breakpoints.
                    locals: {
                        item: item,
                        rops: vm.rops
                    }
                })
                .then(function (answer) {
                    // console.log(answer);
                }, function () {
                    // $scope.status = 'You cancelled the dialog.';
                });
            ev.stopPropagation();
        };

        function DialogController($scope, $mdDialog, item, rops) {
            var d = this;
            d.configItem = item;
            d.rops = rops;
            d.closeFieldConfigDialog = function () {
                $mdDialog.hide();
            };

            d.cancel = function () {
                $mdDialog.cancel();
            };

            d.passConfig = function (item) {
                /** if the item is a 'template' then
                 * assign default value of '<div></div>'
                 * to prevent removal of template
                 */
                if (item.template === '') {
                    item.template = '<div></div>';
                }
                $mdDialog.hide('');
            };
        }

        /** Properties to be excluded from being 
         * displayed in the configuration modal pop-up*/
        vm.rops = [
            'templateType',
            'type',
            'fieldGroup',
            'originalModel',
            'extras',
            'data',
            'value',
            'runExpressions',
            'resetModel',
            'updateInitialValue',
            'formControl',
            'initialValue',
            'errorExistsAndShouldBeVisible',
            'newProperty',
            'newItemType'
        ];
    }
})();