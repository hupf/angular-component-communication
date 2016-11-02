(function() {
  'use strict';

  angular
    .module('app')
    .component('contactForm', {
      bindings: {
        contact: '<',
        submit: '&',
        cancel: '&'
      },
      template: '<div class="container">' +
      '<form name="contactForm" ng-submit="vm.submit()" novalidate>' +
      '  <div class="row">' +
      '    <div class="column column-100">' +
      '      <fieldset>' +
      '        <label>First name</label>' +
      '        <input type="text" ng-model="vm.contact.first_name">' +
      '        <label>Last name</label>' +
      '        <input type="text" ng-model="vm.contact.last_name">' +
      '        <label>Phone</label>' +
      '        <input type="text" ng-model="vm.contact.phone">' +
      '      </fieldset>' +
      '    </div>' +
      '  </div>' +
      '  <div class="row">' +
      '    <div class="column column-100">' +
      '      <button class="button" type="submit">Save</button>' +
      '      <button ng-click="vm.cancel()" class="button button-clear" type="button">Cancel</button>' +
      '    </div>' +
      '  </div>' +
      '</form>' +
      '</div>',
      controller: ContactFormController,
      controllerAs: 'vm'
    });

  ContactFormController.$inject = [];

  /* @ngInject */
  function ContactFormController() {}
})();
