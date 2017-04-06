'use strict';

describe('Controller: CdpCdpConsultaCtrl', function () {

  // load the controller's module
  beforeEach(module('financieraClienteApp'));

  var CdpCdpConsultaCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CdpCdpConsultaCtrl = $controller('CdpCdpConsultaCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(CdpCdpConsultaCtrl.awesomeThings.length).toBe(3);
  });
});
