'use strict';

describe('Controller: IvaIvaCtrl', function () {

  // load the controller's module
  beforeEach(module('financieraClienteApp'));

  var IvaIvaCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    IvaIvaCtrl = $controller('IvaIvaCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(IvaIvaCtrl.awesomeThings.length).toBe(3);
  });
});
