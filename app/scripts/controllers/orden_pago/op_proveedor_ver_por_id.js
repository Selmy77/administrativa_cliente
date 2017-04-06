'use strict';

/**
 * @ngdoc function
 * @name financieraClienteApp.controller:OrdenPagoOpProveedorVerPorIdCtrl
 * @description
 * # OrdenPagoOpProveedorVerPorIdCtrl
 * Controller of the financieraClienteApp
 */
angular.module('financieraClienteApp')
  .controller('OpProveedorVerPorIdCtrl', function ($scope, $routeParams, financieraRequest) {
    var self = this;
    self.ordenPagoProveedorId = $routeParams.Id
  });
