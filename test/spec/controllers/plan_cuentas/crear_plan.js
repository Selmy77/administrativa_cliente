'use strict';

describe('Controller: PlanCuentasCrearPlanCtrl', function () {

  // load the controller's module
  beforeEach(module('financieraClienteApp'));

  var PlanCuentasCrearPlanCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PlanCuentasCrearPlanCtrl = $controller('PlanCuentasCrearPlanCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(PlanCuentasCrearPlanCtrl.awesomeThings.length).toBe(3);
  });
});
