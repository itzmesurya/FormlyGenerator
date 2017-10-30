(function () {
    'use strict';

    angular
        .module('ep.prism')
        .controller('PrismController', PrismController);

    PrismController.$inject = ['$scope', '$location', '$http', '$window', '$mdDialog','$epGenericDataService','epGenSettingsVal'];

    function PrismController($scope, $location, $http, $window, $mdDialog, $epGenericDataService,epGenSettingsVal) {
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
        vm.getFieldData = function () {
            $epGenericDataService.getFormlyForm(programname,
                formname, {
                        'params': {
                            'isDev': epGenSettingsVal.isDev
                        },
                        'pi_user': 'User'
                    })
                .$promise.then(function (data) {
                    if (data) {
                        vm.mergedJsonWithSections = data.data;
                        for (var key in vm.mergedJsonWithSections) {
                            if (vm.mergedJsonWithSections.hasOwnProperty(key) && angular.isArray(vm.mergedJsonWithSections[key])) {
                                vm.sections.push(key);
                            }
                        }
                    }
                });
        };
        vm.getFieldData();
        // $http.post('http://localhost:3000/genericdataservice/getFormlyFieldsForGenerator/' + programname + '/' + formname, {
        //     "action": "getFormlyFieldsForGenerator",
        //     "programName": programname,
        //     "formName": formname,
        //     "params": {
        //         "isDev": false
        //     },
        //     "cachingInfo": {}
        // }).then(function (response) {
        //     vm.mergedJsonWithSections = response.data.data;
        //     for (var key in vm.mergedJsonWithSections) {
        //         if (vm.mergedJsonWithSections.hasOwnProperty(key)) {
        //             vm.sections.push(key);
        //         }
        //     }
        // }, function (response) {

        // });

        activate();

        ////////////////

        function activate() {}


        //var vm = this;
        var _ = $window._;
        vm.models = {
            selected: null
        };

        vm.formlyTemplatesList = [];

        $http.post('/api/getJson/PRISMMetaData').then(function (response) {
            // console.log(response.data);
            vm.formlyTemplatesList = response.data;
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

            /** make sure the JSON has the templateType property in all of its  */
            vm.formlyTemplatesList.forEach(function (element) {
                vm.checkTemplateTypeNS.addTemplateType(element);
            }, this);
        }, function (response) {

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

        /** Name space to handle the templateType */
        vm.checkTemplateTypeNS = {
            addTemplateType: function (jsonobj) {
                /** make sure the object is not a generic template */
                if (jsonobj && !jsonobj.template) {
                    if (jsonobj.fieldGroup) {
                        if (jsonobj.templateOptions) {
                            jsonobj.templateOptions.templateType = 'fieldgroup';

                        } else {
                            jsonobj.templateOptions = {
                                templateType: 'fieldgroup'
                            };
                        }
                        /** check recurssively for each object in the fieldGroup array */
                        jsonobj.fieldGroup.forEach(function (element) {
                            vm.checkTemplateTypeNS.addTemplateType(element);
                        }, this);
                    } else if (jsonobj.templateOptions) {
                        jsonobj.templateOptions.templateType = 'field';
                    } else if (!jsonobj.templateOptions) {
                        jsonobj.templateOptions = {
                            templateType: 'field'
                        };
                    }
                }
            }
        };


        /** on click of a section load the particular JSON field into the formly generator */
        vm.loadSectionJson = function (section) {
            /** make sure the JSON has the templateType property in all of its  */
            vm.mergedJsonWithSections[section].forEach(function (element) {
                vm.checkTemplateTypeNS.addTemplateType(element);
            }, this);
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