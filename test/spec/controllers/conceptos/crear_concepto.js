'use strict';

describe('Controller: ConceptosCrearConceptoCtrl', function () {

  // load the controller's module
  beforeEach(module('financieraClienteApp'));

  var ConceptosCrearConceptoCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ConceptosCrearConceptoCtrl = $controller('ConceptosCrearConceptoCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ConceptosCrearConceptoCtrl.awesomeThings.length).toBe(3);
  });
});
