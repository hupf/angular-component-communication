(function() {
  'use strict';

  angular
    .module('app')
    .component('contactPanel', {
      bindings: {
        contact: '<',
        saved: '&',
        destroy: '&',
        close: '&'
      },
      template: '<contact-show ng-if="!vm.formModel" contact="vm.contact" edit="vm.edit()" destroy="vm.destroy({$contact: vm.contact})" close="vm.close()"></contact-show>' +
      '<contact-form ng-if="vm.formModel" contact="vm.formModel" submit="vm.submit()" cancel="vm.cancelEdit()"></contact-form>',
      controller: ContactPanelController,
      controllerAs: 'vm'
    });

  ContactPanelController.$inject = [];

  /* @ngInject */
  function ContactPanelController() {
    var vm = this;

    vm.edit = edit;
    vm.cancelEdit = cancelEdit;
    vm.submit = submit;

    activate();

    return;

    function activate() {
      if (vm.contact.id != null) {
        vm.formModel = undefined;
      } else {
        edit();
      }
    }

    function edit() {
      vm.formModel = angular.copy(vm.contact, {});
    };

    function cancelEdit() {
      if (vm.contact.id != null) {
        vm.formModel = undefined;
      } else {
        vm.close();
      }
    };

    function submit() {
      angular.copy(vm.formModel, vm.contact)
      vm.contact.$save().then(function(contact) {
        vm.saved({$contact: contact});
        vm.formModel = undefined;
      });
    }
  }
})();
