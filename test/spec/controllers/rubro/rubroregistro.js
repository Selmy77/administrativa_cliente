'use strict';

describe('Controller: RubroRubroregistroCtrl', function () {

  // load the controller's module
  beforeEach(module('financieraClienteApp'));

  var RubroRubroregistroCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    RubroRubroregistroCtrl = $controller('RubroRubroregistroCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(RubroRubroregistroCtrl.awesomeThings.length).toBe(3);
  });
});
