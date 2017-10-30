(function () {
    'use strict';

    angular
        .module('directives')
        .directive('navBar', navBar);


    function navBar() {
        // Usage():
        //
        // Creates: Bootstrap navBar
        //
        var directive = {
            bindToController: true,
            templateUrl: 'directives/navbar.html',
            controller: navBarController,
            controllerAs: 'nbc',
            link: link,
            compile: function (element, attributes) {

                return {
                    pre: function (scope, element, attributes, controller, transcludeFn) {
                        //console.log('pre');
                    },
                    post: function (scope, element, attributes, controller, transcludeFn) {
                        //console.log('post');
                    }
                }
            },
            restrict: 'AE',
            scope: {}
        };
        return directive;

        function link(scope, element, attrs) {
            //console.log('link');
        }
    }
    navBarController.$inject = ['$element', '$mdPanel'];
    /* @ngInject */
    function navBarController($element, $mdPanel) {
        this.settings = {
            name: 'settings',
            items: [
                'textbox',
                'ddl',
                'Autocomplete'
            ]
        };
        this.favorite = {
            name: 'favorite',
            items: [
                'Add to Favorites'
            ]
        };
        this.more = {
            name: 'more',
            items: [
                'Account',
                'Sign Out'
            ]
        };
        this.tools = {
            name: 'tools',
            items: [
                'Create',
                'Delete'
            ]
        };
        this.code = {
            name: 'code',
            items: [
                'See Source',
                'See Commits'
            ]
        };

        this.menuTemplate = '' +
            '<div class="menu-panel" md-whiteframe="6">' +
            '  <div class="menu-content">' +
            '    <div class="menu-item" ng-repeat="item in ctrl.items">' +
            '      <button class="md-button">' +
            '        <span>{{item}}</span>' +
            '      </button>' +
            '    </div>' +
            '    <md-divider></md-divider>' +
            '    <div class="menu-item">' +
            '      <button class="md-button" ng-click="ctrl.closeMenu()">' +
            '        <span>Close Menu</span>' +
            '      </button>' +
            '    </div>' +
            '  </div>' +
            '</div>';

        $mdPanel.newPanelGroup('toolbar', {
            maxOpen: 2
        });

        $mdPanel.newPanelGroup('menus', {
            maxOpen: 3
        });

        this.showToolbarMenu = function ($event, menu) {
            var template = this.menuTemplate;

            var position = $mdPanel.newPanelPosition()
                .relativeTo('#mainToolbar').addPanelPosition('align-start', 'below');

            var config = {
                id: 'toolbar_' + menu.name,
                attachTo: angular.element(document.body),
                controller: PanelMenuCtrl,
                controllerAs: 'ctrl',
                template: template,
                position: position,
                panelClass: 'menu-panel-container',
                locals: {
                    items: menu.items
                },
                openFrom: $event,
                focusOnOpen: false,
                clickOutsideToClose: true,
                propagateContainerEvents: true,
                groupName: ['toolbar', 'menus']
            };

            $mdPanel.open(config);
        };

        this.showContentMenu = function ($event, menu) {
            var template = this.menuTemplate;

            var position = $mdPanel.newPanelPosition()
                .relativeTo($event.srcElement)
                .addPanelPosition(
                    $mdPanel.xPosition.ALIGN_START,
                    $mdPanel.yPosition.BELOW
                );

            var config = {
                id: 'content_' + menu.name,
                attachTo: angular.element(document.body),
                controller: PanelMenuCtrl,
                controllerAs: 'ctrl',
                template: template,
                position: position,
                panelClass: 'menu-panel-container',
                locals: {
                    items: menu.items
                },
                openFrom: $event,
                focusOnOpen: false,
                zIndex: 10000,
                clickOutsideToClose: true,
                propagateContainerEvents: true,
                groupName: 'menus'
            };

            $mdPanel.open(config);
        };
        this.title = "Welcome to multi-template demo";
        this.openMenu = function ($mdOpenMenu, ev) {
            $mdMenu.open(ev);
        }
    }

    PanelMenuCtrl.$inject = ['mdPanelRef'];

    function PanelMenuCtrl(mdPanelRef) {
        this.closeMenu = function () {
            mdPanelRef && mdPanelRef.close();
        }
    }
})();