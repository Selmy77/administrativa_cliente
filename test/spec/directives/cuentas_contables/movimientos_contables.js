'use strict';

describe('Directive: movimientosContables', function () {

  // load the directive's module
  beforeEach(module('financieraClienteApp'));

  var element,
    scope,
    controller,
    scopectrl;

  beforeEach(inject(function ($compile,$rootScope) {
    element = angular.element('<movimientos-contables><movimientos-contables>');
    scope = $rootScope.$new();
    $compile(element)(scope);
  }));

  it('should make hidden element visible', inject(function () {
    var conceptoid=1;
    controller=element.controller('movimientosContables',{
      $scope: scopectrl
      // place here mocked dependencies
    });
    expect(controller.test).toBe({});
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<movimientos-contables><movimientos-contables>');

    expect(element.text()).toBe('');
  }));
});
