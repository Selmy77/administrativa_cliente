'use strict';

describe('Controller: PlanCuentasCrearCuentasCtrl', function () {

  // load the controller's module
  beforeEach(module('financieraClienteApp'));

  var PlanCuentasCrearCuentasCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PlanCuentasCrearCuentasCtrl = $controller('PlanCuentasCrearCuentasCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(PlanCuentasCrearCuentasCtrl.awesomeThings.length).toBe(3);
  });
});
