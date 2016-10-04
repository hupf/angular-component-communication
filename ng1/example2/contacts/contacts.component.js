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
      '  <contacts-list contacts="vm.contacts" select-contact="vm.showDetail($contact)"></contacts-list>' +
      '</div>' +
      '<contact-panel ng-if="vm.selectedContact" contact="vm.selectedContact" saved="vm.saved($contact)" destroy="vm.destroy($contact)" close="vm.closeDetail()"></contact-panel>',
      controller: ContactsController,
      controllerAs: 'vm'
    });

  ContactsController.$inject = ['contactsService'];

  /* @ngInject */
  function ContactsController(contactsService) {
    var vm = this;

    vm.showDetail = showDetail;
    vm.closeDetail = closeDetail;
    vm.add = add;
    vm.saved = saved;
    vm.destroy = destroy;

    activate();

    return;

    function activate() {
      contactsService.query().$promise.then(function(contacts) {
        vm.contacts = contacts;
      });
    }

    function showDetail(contact) {
      vm.selectedContact = contact;
    }

    function closeDetail() {
      vm.selectedContact = undefined;
    }

    function add() {
      vm.showDetail(new contactsService());
    }

    function saved(contact) {
      var index = vm.contacts.find(function (c) { return c.id === contact.id; });
      if (index >= 0) {
        vm.contacts[index] = contact;
      } else {
        vm.contacts.unshift(contact);
      }
    }

    function destroy(contact) {
      contact.$delete().then(function () {
        vm.contacts.splice(vm.contacts.indexOf(contact), 1);
        if (contact === vm.selectedContact) {
          vm.closeDetail();
        }
      });
    }
  }
})();
