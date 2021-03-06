(function() {
  'use strict';

  angular
    .module('app')
    .component('contactPanel', {
      bindings: {},
      template: '' +
      '<contact-show ng-if="!vm.formModel" ' +
      '  contact="vm.contact" ' +
      '  edit="vm.startEdit()" ' +
      '  destroy="vm.destroy()"></contact-show>' +
      '<contact-form ng-if="vm.formModel" ' +
      '  contact="vm.formModel" ' +
      '  submit="vm.submit()" ' +
      '  cancel="vm.cancelEdit()"></contact-form>',
      controller: ContactPanelController,
      controllerAs: 'vm'
    });

  ContactPanelController.$inject = ['$scope', '$stateParams', '$state', 'contactsService',
    'contactsStateService'];

  /* @ngInject */
  function ContactPanelController($scope, $stateParams, $state, contactsService,
                                  contactsStateService) {
    var vm = this;

    vm.contact = undefined;
    vm.formModel = undefined;

    vm.startEdit = startEdit;
    vm.cancelEdit = cancelEdit;
    vm.submit = submit;
    vm.destroy = destroy;

    activate();

    return;

    function activate() {
      loadContact($stateParams.id);
    }

    function loadContact(id) {
      if (id === 'new') {
        vm.contact = new contactsService();
        startEdit();
      } else {
        contactsStateService.getContact(id).then(function(contact) {
          vm.contact = contact;
          if (vm.formModel) {
            startEdit();
          }
        });
      }
    }

    function startEdit() {
      vm.formModel = angular.copy(vm.contact, {});
    }

    function cancelEdit() {
      vm.formModel = undefined;
      if (vm.contact.id == null) {
        closePanel();
      }
    }

    function closePanel() {
      $state.go('contacts');
    }

    function submit() {
      angular.copy(vm.formModel, vm.contact)

      var promise;
      if (vm.contact.id == null) {
        promise = vm.contact.$save();
      } else {
        promise = vm.contact.$update();
      }
      promise.then(function(contact) {
        $scope.$emit('contacts:saved', contact);
        vm.formModel = undefined;
      });
    }

    function destroy() {
      vm.contact.$delete().then(function () {
        closePanel();
        $scope.$emit('contacts:destroyed', vm.contact);
      });
    }
  }
})();
