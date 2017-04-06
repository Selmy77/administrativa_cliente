'use strict';

describe('Controller: RubroRubroApropiacionAprobacionCtrl', function () {

  // load the controller's module
  beforeEach(module('financieraClienteApp'));

  var RubroRubroApropiacionAprobacionCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    RubroRubroApropiacionAprobacionCtrl = $controller('RubroRubroApropiacionAprobacionCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(RubroRubroApropiacionAprobacionCtrl.awesomeThings.length).toBe(3);
  });
});
