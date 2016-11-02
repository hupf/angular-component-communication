(function() {
  'use strict';

  angular
    .module('app')
    .component('contacts', {
      bindings: {},
      template: '<div class="container">' +
      '  <div class="row">' +
      '    <div class="column column-100">' +
      '      <h2>Contacts</h2>' +
      '    </div>' +
      '  </div>' +
      '  <contacts-toolbar add="vm.add()"></contacts-toolbar>' +
      '  <contacts-list ' +
      '    contacts="vm.contacts" ' +
      '    select-contact="vm.selectContact($contact)"></contacts-list>' +
      '</div>' +
      '<contact-panel ng-if="vm.selectedContact" ' +
      '  contact="vm.selectedContact" ' +
      '  saved="vm.saved($contact)" ' +
      '  destroyed="vm.destroyed($contact)" ' +
      '  close="vm.selectContact()"></contact-panel>',
      controller: ContactsController,
      controllerAs: 'vm'
    });

  ContactsController.$inject = ['contactsService'];

  /* @ngInject */
  function ContactsController(contactsService) {
    var vm = this;

    vm.contacts = undefined;
    vm.selectedContact = undefined;

    vm.selectContact = selectContact;
    vm.add = add;
    vm.saved = saved;
    vm.destroyed = destroyed;

    activate();

    return;

    function activate() {
      loadContacts();
    }

    function loadContacts() {
      contactsService.query().$promise.then(function(contacts) {
        vm.contacts = contacts;
      });
    }

    function selectContact(contact) {
      vm.selectedContact = contact;
    }

    function add() {
      vm.selectContact(new contactsService());
    }

    function saved(contact) {
      var index = vm.contacts.findIndex(function (c) { return c.id === contact.id; });
      if (index === -1) {
        vm.contacts.unshift(contact);
      }
    }

    function destroyed(contact) {
      vm.contacts.splice(vm.contacts.indexOf(contact), 1);
      if (contact === vm.selectedContact) {
        vm.selectContact();
      }
    }
  }
})();
