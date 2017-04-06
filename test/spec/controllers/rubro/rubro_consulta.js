'use strict';

describe('Controller: RubroRubroConsultaCtrl', function () {

  // load the controller's module
  beforeEach(module('financieraClienteApp'));

  var RubroRubroConsultaCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    RubroRubroConsultaCtrl = $controller('RubroRubroConsultaCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(RubroRubroConsultaCtrl.awesomeThings.length).toBe(3);
  });
});
