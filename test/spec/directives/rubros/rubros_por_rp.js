'use strict';

describe('Directive: rubros/rubrosPorRp', function () {

  // load the directive's module
  beforeEach(module('financieraClienteApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<rubros/rubros-por-rp></rubros/rubros-por-rp>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the rubros/rubrosPorRp directive');
  }));
});
