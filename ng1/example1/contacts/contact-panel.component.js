(function() {
  'use strict';

  angular
    .module('app')
    .component('contactPanel', {
      bindings: {
        contact: '<',
        saved: '&',
        destroyed: '&',
        close: '&'
      },
      template: '' +
      '<contact-show ng-if="!vm.formModel" ' +
      '  contact="vm.contact" ' +
      '  edit="vm.startEdit()" ' +
      '  destroy="vm.destroy()" ' +
      '  close="vm.close()"></contact-show>' +
      '<contact-form ng-if="vm.formModel" ' +
      '  contact="vm.formModel" ' +
      '  submit="vm.submit()" ' +
      '  cancel="vm.cancelEdit()"></contact-form>',
      controller: ContactPanelController,
      controllerAs: 'vm'
    });

  ContactPanelController.$inject = ['$scope'];

  /* @ngInject */
  function ContactPanelController($scope) {
    var vm = this;

    vm.formModel = undefined;

    vm.startEdit = startEdit;
    vm.cancelEdit = cancelEdit;
    vm.submit = submit;
    vm.destroy = destroy;

    activate();

    return;

    function activate() {
      initFormModel();
      $scope.$watch('vm.contact', initFormModel);
    }

    function initFormModel() {
      if (vm.contact.id == null || vm.formModel) {
        startEdit();
      }
    }

    function startEdit() {
      vm.formModel = angular.copy(vm.contact, {});
    };

    function cancelEdit() {
      vm.formModel = undefined;
      if (vm.contact.id == null) {
        vm.close();
      }
    };

    function submit() {
      angular.copy(vm.formModel, vm.contact)

      var promise;
      if (vm.contact.id == null) {
        promise = vm.contact.$save();
      } else {
        promise = vm.contact.$update();
      }
      promise.then(function(contact) {
        vm.saved({$contact: contact});
        vm.formModel = undefined;
      });
    }

    function destroy() {
      vm.contact.$delete().then(function () {
        vm.destroyed({$contact: vm.contact});
      });
    }
  }
})();
