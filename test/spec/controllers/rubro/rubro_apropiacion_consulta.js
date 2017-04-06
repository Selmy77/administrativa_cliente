'use strict';

describe('Controller: RubroRubroApropiacionConsultaCtrl', function () {

  // load the controller's module
  beforeEach(module('financieraClienteApp'));

  var RubroRubroApropiacionConsultaCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    RubroRubroApropiacionConsultaCtrl = $controller('RubroRubroApropiacionConsultaCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(RubroRubroApropiacionConsultaCtrl.awesomeThings.length).toBe(3);
  });
});
