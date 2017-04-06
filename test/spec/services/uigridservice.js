'use strict';

describe('Service: uiGridService', function () {

  // load the service's module
  beforeEach(module('financieraClienteApp'));

  // instantiate service
  var uiGridService;
  beforeEach(inject(function (_uiGridService_) {
    uiGridService = _uiGridService_;
  }));

  it('should do something', function () {
    expect(!!uiGridService).toBe(true);
  });

});
