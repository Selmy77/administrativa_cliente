'use strict';

describe('Controller: RubroRubroApropiacionPlaneacionCtrl', function () {

  // load the controller's module
  beforeEach(module('financieraClienteApp'));

  var RubroRubroApropiacionPlaneacionCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    RubroRubroApropiacionPlaneacionCtrl = $controller('RubroRubroApropiacionPlaneacionCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(RubroRubroApropiacionPlaneacionCtrl.awesomeThings.length).toBe(3);
  });
});
