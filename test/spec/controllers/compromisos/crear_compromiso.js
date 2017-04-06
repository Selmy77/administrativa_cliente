'use strict';

describe('Controller: CompromisosCrearCompromisoCtrl', function () {

  // load the controller's module
  beforeEach(module('financieraClienteApp'));

  var CompromisosCrearCompromisoCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CompromisosCrearCompromisoCtrl = $controller('CompromisosCrearCompromisoCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(CompromisosCrearCompromisoCtrl.awesomeThings.length).toBe(3);
  });
});
