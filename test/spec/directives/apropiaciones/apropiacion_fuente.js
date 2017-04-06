'use strict';

describe('Directive: apropiaciones/apropiacionFuente', function () {

  // load the directive's module
  beforeEach(module('financieraClienteApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<apropiaciones/apropiacion-fuente></apropiaciones/apropiacion-fuente>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the apropiaciones/apropiacionFuente directive');
  }));
});
