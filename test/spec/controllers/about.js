'use strict';

describe('Controller: AboutCtrl', function () {

  // load the controller's module
  beforeEach(module('financieraClienteApp'));

  var AboutCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AboutCtrl = $controller('AboutCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('esto es una prueba sde tests en about, deberia salir lo asignado en la variable', function () {
    expect(AboutCtrl.algo).toBe("prueba");
  });
});
