'use strict';

describe('Service: administrativaService', function () {

  // load the service's module
  beforeEach(module('financieraClienteApp'));

  // instantiate service
  var administrativaService;
  beforeEach(inject(function (_administrativaService_) {
    administrativaService = _administrativaService_;
  }));

  it('should do something', function () {
    expect(!!administrativaService).toBe(true);
  });

});
