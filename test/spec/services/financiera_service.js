'use strict';

describe('Service: financieraService', function () {

  // load the service's module
  beforeEach(module('financieraClienteApp'));

  // instantiate service
  var financieraService;
  beforeEach(inject(function (_financieraService_) {
    financieraService = _financieraService_;
  }));

  it('should do something', function () {
    expect(!!financieraService).toBe(true);
  });

});
