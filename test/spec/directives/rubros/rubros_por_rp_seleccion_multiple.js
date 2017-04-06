'use strict';

describe('Directive: rubros/rubrosPorRpSeleccionMultiple', function () {

  // load the directive's module
  beforeEach(module('financieraClienteApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<rubros/rubros-por-rp-seleccion-multiple></rubros/rubros-por-rp-seleccion-multiple>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the rubros/rubrosPorRpSeleccionMultiple directive');
  }));
});
