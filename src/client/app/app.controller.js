(function () {
    'use strict';

    angular
        .module('ep.formly.gen')
        .controller('mainController', MainController);

    MainController.$inject = ['$scope', '$location', '$state'];

    function MainController($scope, $location, $state) {
        var vm = this;
        vm.text = 'Loaded';
        vm.scripts = "app/partials/ace-scripts.html";
        activate();

        function activate() {
            console.log('mainController activated!');
            var ui = $location.$$url.split("/")[$location.$$url.split("/").length - 1];
            switch (ui) {
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
        $scope.openLeftMenu = function () {

        };
    }
})();