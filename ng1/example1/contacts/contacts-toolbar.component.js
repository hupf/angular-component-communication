(function() {
  'use strict';

  angular
    .module('app')
    .component('contactsToolbar', {
      bindings: {
        add: '&'
      },
      template: '<div class="row">' +
        '  <div class="column column-100">' +
        '    <button class="button button-outline" ng-click="vm.add()">Add</button>' +
        '  </div>' +
        '</div>',
      controller: ContactsToolbarController,
      controllerAs: 'vm'
    });

  ContactsToolbarController.$inject = [];

  /* @ngInject */
  function ContactsToolbarController() {}
})();
