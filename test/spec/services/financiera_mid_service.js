'use strict';

describe('Service: financieraMidService', function () {

  // load the service's module
  beforeEach(module('financieraClienteApp'));

  // instantiate service
  var financieraMidService;
  beforeEach(inject(function (_financieraMidService_) {
    financieraMidService = _financieraMidService_;
  }));

  it('should do something', function () {
    expect(!!financieraMidService).toBe(true);
  });

});
