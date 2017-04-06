'use strict';

describe('Controller: RpRpConsultaCtrl', function () {

  // load the controller's module
  beforeEach(module('financieraClienteApp'));

  var RpRpConsultaCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    RpRpConsultaCtrl = $controller('RpRpConsultaCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(RpRpConsultaCtrl.awesomeThings.length).toBe(3);
  });
});
