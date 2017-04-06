'use strict';

describe('Controller: CdpCdpSolicitudConsultaCtrl', function () {

  // load the controller's module
  beforeEach(module('financieraClienteApp'));

  var CdpCdpSolicitudConsultaCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CdpCdpSolicitudConsultaCtrl = $controller('CdpCdpSolicitudConsultaCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(CdpCdpSolicitudConsultaCtrl.awesomeThings.length).toBe(3);
  });
});
