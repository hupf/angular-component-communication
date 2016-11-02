(function() {
  'use strict';

  angular
    .module('app')
    .factory('contactsService', contactsService);

  contactsService.$inject = ['$resource'];

  /* @ngInject */
  function contactsService($resource) {
    return $resource('http://localhost:3030/contacts/:id',
      { id: '@id' },
      { 'update': { method: 'PUT' } }
    );
  }
})();
