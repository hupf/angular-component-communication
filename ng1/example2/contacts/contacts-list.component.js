(function() {
  'use strict';

  angular
    .module('app')
    .component('contactsList', {
      bindings: {
        contacts: '<'
      },
      template: '<table>' +
      '<thead><tr><th>First name</th><th>Last name</th><th>Phone</th></tr></thead>' +
      '<tbody>' +
      '<tr ng-repeat="contact in vm.contacts">' +
      '<td><a ui-sref="contacts.detail({id: contact.id})">{{contact.first_name}}</a></td>' +
      '<td><a ui-sref="contacts.detail({id: contact.id})">{{contact.last_name}}</a></td>' +
      '<td><a ui-sref="contacts.detail({id: contact.id})">{{contact.phone}}</a></td>' +
      '</tr>' +
      '</tbody>' +
      '</table>',
      controller: ContactsListController,
      controllerAs: 'vm'
    });

  ContactsListController.$inject = [];

  /* @ngInject */
  function ContactsListController() {}
})();
