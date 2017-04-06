'use strict';

describe('Controller: RpRpDetalleCtrl', function () {

  // load the controller's module
  beforeEach(module('financieraClienteApp'));

  var RpRpDetalleCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    RpRpDetalleCtrl = $controller('RpRpDetalleCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(RpRpDetalleCtrl.awesomeThings.length).toBe(3);
  });
});
