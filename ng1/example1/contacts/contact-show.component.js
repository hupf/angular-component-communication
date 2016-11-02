(function() {
  'use strict';

  angular
    .module('app')
    .component('contactShow', {
      bindings: {
        contact: '<',
        edit: '&',
        destroy: '&',
        close: '&'
      },
      template: '<div class="container">' +
      '  <div class="row">' +
      '    <div class="column column-50"><label>First name</label></div>' +
      '    <div class="column column-50">{{vm.contact.first_name}}</div>' +
      '  </div>' +
      '  <div class="row">' +
      '    <div class="column column-50"><label>Last name</label></div>' +
      '    <div class="column column-50">{{vm.contact.last_name}}</div>' +
      '  </div>' +
      '  <div class="row">' +
      '    <div class="column column-50"><label>Phone</label></div>' +
      '    <div class="column column-50">{{vm.contact.phone}}</div>' +
      '  </div>' +
      '  <div class="row">' +
      '    <div class="column column-100">' +
      '      <button ng-click="vm.edit()" class="button" type="button">Edit</button>' +
      '      <button ng-click="vm.destroy()" class="button button-outline" type="button">Delete</button>' +
      '      <button ng-click="vm.close()" class="button button-clear" type="button">Close</button>' +
      '    </div>' +
      '  </div>' +
      '</div>',
      controller: ContactShowController,
      controllerAs: 'vm'
    });

  ContactShowController.$inject = [];

  /* @ngInject */
  function ContactShowController() {}
})();
