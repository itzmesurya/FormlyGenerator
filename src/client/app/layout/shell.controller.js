(function () {
    'use strict';

    angular
        .module('ep.formly.gen.layout')
        .controller('Shell', Shell);

    Shell.$inject = ['$timeout'];

    function Shell($timeout) {
        var vm = this;
        vm.menuItems = [{
                name: "Pages",
                items: [{
                        name: 'Home',
                        url: '/home'
                    },
                    {
                        name: 'Layout Preview',
                        url: '/layoutpreview'
                    }
                ]
            }
        ];
    }
})();