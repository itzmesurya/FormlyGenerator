(function () {
    'use strict';

    angular
        .module('ep.prism')
        .directive('jsonInputRepeater', jsonInputRepeater);

    jsonInputRepeater.$inject = ['$http', '$compile'];

    function jsonInputRepeater($http, $compile) {
        // Usage:
        //
        // Creates:
        //
        var directive = {
            // bindToController:true,
            controller: jsonInputRepeaterController,
            templateUrl: 'prism/jsonInputRepeater.html',
            controllerAs: 'vm',
            link: link,
            restrict: 'E',
            scope: {
                data: '=',
                rops: '=',
                noRemoveButton: '='
            }
        };
        return directive;

        function link(scope, element, attrs) {
            console.log('jsonInputRepeater link');
        }
    }
    /* @ngInject */
    jsonInputRepeaterController.$inject = ['$scope', '$window']

    function jsonInputRepeaterController($scope, $window) {
        var vm = this;
        var _ = $window._;
        vm.noRemoveButton = $scope.noRemoveButton;
        vm.isTypeOf = function (val, type) {
            return typeof val === type;
        }
        vm.numInputBlur = function (data) {
            if (!data.newProperty.val) {
                data.newProperty.val = 0;
            }
        }
        vm.checkRops = function (key) {
            return $scope.rops.indexOf(key) > -1;
        }
        vm.addNewProperty = function (data) {
            data[angular.copy(data.newProperty.key)] = angular.copy(data.newProperty.val);
            delete data.newProperty;
            delete data.newItemType;
        }

        vm.addNewChildProperty = function (data) {
            if (!data.newObjectTable) {
                data.newObjectTable = [];
            }
            data.newObjectTable.push(angular.copy(data.newProperty));
            delete data.newProperty;
            delete data.newItemType;
        }

        vm.addNewObjectProperty = function (data) {
            var newObject = {};
            data.newObjectTable.forEach(function (element) {
                newObject[element.key] = element.val;
            });
            data.push(newObject);
            delete data.newObjectTable;
        }

        vm.newItemTypeChange = function (data) {
            data.newProperty.val = [{
                someKey: 'someVal'
            }];
        }

        vm.deleteChildProperty = function (item, array) {
            array.newObjectTable = _.without(array.newObjectTable, _.findWhere(array.newObjectTable, item));
        }
        vm.removeObjectFromArray = function (item, array) {
            if (array.length > 1) {
                array.splice(array.indexOf(item), 1);
            } else {
                alert('There should be atleast one item!');
            }

        }
        vm.deleteItem = function (data, key) {
            delete data[key];
        }
    }
})();