'use strict';

describe('Service: notificacion', function () {

  // load the service's module
  beforeEach(module('financieraClienteApp'));

  // instantiate service
  var notificacion;
  beforeEach(inject(function (_notificacion_) {
    notificacion = _notificacion_;
  }));

  it('should do something', function () {
    expect(!!notificacion).toBe(true);
  });

});
