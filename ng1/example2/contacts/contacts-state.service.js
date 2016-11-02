(function() {
  'use strict';

  angular
    .module('app')
    .factory('contactsStateService', contactsStateService);

  contactsStateService.$inject = ['$q', 'contactsService'];

  /* @ngInject */
  function contactsStateService($q, contactsService) {
    var deferreds = [],
      contacts = undefined,
      service = {
        loadContacts: loadContacts,
        getContact: getContact,
        updateContacts: updateContacts
      };

    return service;

    function loadContacts() {
      return contactsService.query().$promise.then(function(result) {
        contacts = result;

        deferreds.forEach(function(deferred) {
          deferred.resolve(contacts);
        });
        deferreds = [];

        return contacts;
      });
    }

    function updateContacts(newContacts) {
      contacts = newContacts;
    }

    function getContact(id) {
      if (contacts) {
        return $q.when(contacts.find(function(contact) { return contact.id == id; }));
      } else {
        var deferred = $q.defer();
        deferreds.push(deferred)
        return deferred.promise;
      }
    }
  }
})();
