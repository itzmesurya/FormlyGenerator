/** This file has been created to hold a module that can be injected into the core module of any angular app */
(function () {
    'use strict';

    angular
        .module('jsondiff', [])
        .factory('jsoncompareFactory', jsoncompareFactory);

    jsoncompareFactory.$inject = [];

    function jsoncompareFactory() {
        var factory = {};
        var diffObject = {};
        factory.textAreaChange = function (leftOrRightJson) {
            var parsedObj = null;

            if (angular.isDefined(leftOrRightJson) && leftOrRightJson != "") {
                parsedObj = JSON.parse(leftOrRightJson);
                if (parsedObj.constructor === [].constructor) {
                    leftOrRightJson = stringifyArray(parsedObj);
                } else {
                    leftOrRightJson = JSON.stringify(JSON.parse(leftOrRightJson), undefined, 2);
                }
            }

            return leftOrRightJson;
        }

        var JsonDummyText = "";
        var keysArray = [];
        var valsArray = [];
        factory.showAllPaths = function (leftJsonString, rightJsonString) {
            valsArray = [];
            var leftJson = leftJsonString ? JSON.parse(leftJsonString) : {};
            var rightJson = rightJsonString ? JSON.parse(rightJsonString) : {};
            keysArray = parseKeys(leftJson);
        }

        /**
         * Parse each property and find out 
         */
        function parseKeys(obj, keyString) {
            var _keyString = keyString || '';
            var keysArray = [];
            for (var key in obj) {
                if (obj.hasOwnProperty(key)) {
                    /** check if the value is an object
                     * and if it is, then run the parseKeys
                     * function with value as the array,
                     * and as keyString + "." + key
                     * keyString param
                     */
                    if (obj[key].constructor === {}.constructor) {
                        var array = parseKeys(obj[key], _keyString + "[\"" + key + "\"]");
                        keysArray = keysArray.concat(array);
                    } else {
                        keysArray.push(_keyString + "[\"" + key + "\"]");
                    }
                }
            }
            return keysArray;
        }

        /** stringify an array */
        factory.stringifyArray = function (arrayObj) {
            var resultString = '[';
            arrayObj.forEach(function (element) {
                resultString = resultString + JSON.stringify(element, undefined, 2) + ',';
            }, this);
            resultString = trimCommas(resultString) + ']';
            return resultString;
        }

        factory.trimCommas = function (str) {
            return str.replace(/(^,)|(,$)/g, "");
        }

        /**
         * Compare 2 objects
         */
        factory.compareAndGetDiffJson = function (leftJson, rightJson) {
            var leftJsonObj = JSON.parse(leftJson);
            var righJsonObj = JSON.parse(rightJson);
            var leftStringArray = parseKeys(leftJsonObj);
            var rightStringArray = parseKeys(righJsonObj);
            for (var index = 0; index < rightStringArray.length; index++) {
                var rightString = rightStringArray[index];
                /** check if the left JSON contains this property */
                if (checkPropertyPathUsingEval(leftJsonObj, rightString)) {
                    /** check if the value is same on the right json */
                    var valueCheck = valueCompare(eval(cleanStringForCompare('leftJsonObj' + rightString)), eval(cleanStringForCompare('righJsonObj' + rightString)));
                    var checkBool = eval(cleanStringForCompare('leftJsonObj' + rightString)) === eval(cleanStringForCompare('righJsonObj' + rightString));
                    if (!valueCheck) {
                        assignValTo(rightString, righJsonObj);
                    }
                } else {
                    assignValTo(rightString, righJsonObj);
                }
            }
            var diffObjectString = JSON.stringify(diffObject, undefined, 2);
            return diffObjectString;
        }

        function checkPropertyPathUsingEval(obj, objPropPath) {
            var result = false;
            try {
                result = eval('obj' + objPropPath);
            } catch (error) {
                console.log('Path not found in the left object');
            }
            return result;
        }

        function cleanStringForCompare(dirtyString) {
            return dirtyString.replace(/'/g, '"');
        }

        function valueCompare(leftValue, rightValue) {
            /** Check the type */
            if (leftValue.constructor === rightValue.constructor) {
                /** in case the objects are of the same type */
                /** check if they are array */
                if (leftValue.constructor === [].constructor) {
                    /** compare arrays */
                    return compareArrays(leftValue, rightValue);
                    /** check if they are objects */
                } else if (leftValue.constructor === {}.constructor) {
                    /** compare objects */
                    return compareObjects(leftValue, rightValue);
                } else {
                    return leftValue === rightValue;
                }
            } else {
                /** in case the objects are not of the same type */
                return false;
            }
        }

        function compareObjects(leftObject, rightObject) {
            /** if object compare each property  */
            return JSON.stringify(leftObject) === JSON.stringify(rightObject);
        }

        function compareArrays(leftArray, rightArray) {
            /** if object compare each item  */
            if (leftArray.length === rightArray.length) {
                for (var index = 0; index < leftArray.length; index++) {
                    var element = leftArray[index];
                    if (!valueCompare(leftArray[index], rightArray[index])) {
                        return false;
                    }
                }
            } else {
                return false;
            }
            return true;
        }

        function assignValTo(propString, rightJson, diffObjVariableName) {
            var _diffObjVariableName = diffObjVariableName || 'diffObject';
            if (checkAndCreatePropertyIfNeeded(propString))
                eval(_diffObjVariableName + propString + '= rightJson' + propString);
            //console.log(vm.diffObject);
        }

        function getPropConcatArray(propString) {
            propString = propString.replace(/\["/g, '|').replace(/"\]/g, '');
            propString = propString.substring(1);
            var propArray = propString.split('|');
            var propConcatArray = [];
            for (var index = 1; index <= propArray.length; index++) {
                var stringVal = '';
                for (var j = 0; j < index; j++) {
                    stringVal = stringVal + '["' + propArray[j] + '"]';
                }
                propConcatArray.push(stringVal);
            }
            return propConcatArray;
        }

        function checkAndCreatePropertyIfNeeded(propString) {
            var result = false;
            var propConcatArray = getPropConcatArray(propString);
            /** now that you have the array of concated string paths
             * in an ascending order check each path and make sure that the object is
             * having all the paths
             */
            propConcatArray.forEach(function (element) {
                if (!eval('diffObject' + element)) {
                    eval('diffObject' + element + '= {};');
                }
            });
            if (eval('diffObject' + propString)) {
                result = true;
            }
            return result;
        }

        return factory;
    }

})();