'use strict';

describe('Controller: NotificacionesCtrl', function () {

  // load the controller's module
  beforeEach(module('financieraClienteApp'));

  var NotificacionesCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    NotificacionesCtrl = $controller('NotificacionesCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(NotificacionesCtrl.awesomeThings.length).toBe(3);
  });
});
