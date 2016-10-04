(function() {
  'use strict';

  angular
    .module('app')
    .directive('myApp', AppComponent);

  AppComponent.$inject = [];

  /* @ngInject */
  function AppComponent() {
    var directive = {
      restrict: 'E',
      template: '<h2>Example 1</h2>'
    };
    return directive;
  }
})();
