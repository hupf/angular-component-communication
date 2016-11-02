(function() {
  'use strict';

  angular
    .module('app')
    .config(routesConfig);

  routesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

  /* @ngInject */
  function routesConfig($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/contacts');

    $stateProvider
      .state('contacts', {
        url: '/contacts',
        template: '<contacts></contacts>'
      })
      .state('contacts.detail', {
        url: '/:id',
        template: '<contact-panel></contact-panel>'
      });
  }
})();
