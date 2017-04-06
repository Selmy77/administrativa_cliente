'use strict';

describe('Directive: cdp/listaCdp', function () {

  // load the directive's module
  beforeEach(module('financieraClienteApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<cdp/lista-cdp></cdp/lista-cdp>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the cdp/listaCdp directive');
  }));
});
