(function() {
  'use strict';

  angular
    .module('app')
    .component('contactsList', {
      bindings: {
        contacts: '<',
        selectContact: '&'
      },
      template: '<table>' +
      '<thead><tr><th>First name</th><th>Last name</th><th>Phone</th></tr></thead>' +
      '<tbody>' +
      '<tr ng-repeat="contact in vm.contacts" ng-click="vm.selectContact({$contact: contact})">' +
      '<td>{{contact.first_name}}</td>' +
      '<td>{{contact.last_name}}</td>' +
      '<td>{{contact.phone}}</td>' +
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
