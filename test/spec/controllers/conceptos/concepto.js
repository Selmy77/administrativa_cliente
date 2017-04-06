'use strict';

describe('Controller: ConceptosConceptoCtrl', function () {

  // load the controller's module
  beforeEach(module('financieraClienteApp'));

  var ConceptosConceptoCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ConceptosConceptoCtrl = $controller('ConceptosConceptoCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ConceptosConceptoCtrl.awesomeThings.length).toBe(3);
  });
});
