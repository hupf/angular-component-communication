(function() {
  'use strict';

  angular
    .module('app')
    .component('contactsToolbar', {
      bindings: {},
      template: '<div class="row">' +
        '  <div class="column column-100">' +
        '    <button class="button button-outline" ui-sref="contacts.detail({id: \'new\'})">Add</button>' +
        '  </div>' +
        '</div>',
      controller: ContactsToolbarController,
      controllerAs: 'vm'
    });

  ContactsToolbarController.$inject = [];

  /* @ngInject */
  function ContactsToolbarController() {}
})();
