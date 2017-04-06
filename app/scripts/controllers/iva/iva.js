'use strict';

/**
 * @ngdoc function
 * @name financieraClienteApp.controller:IvaIvaCtrl
 * @description
 * # IvaIvaCtrl
 * Controller of the financieraClienteApp
 */
angular.module('financieraClienteApp')
  .controller('IvaCtrl', function ($scope, financieraRequest) {
    //
    financieraRequest.get("categoria_iva", "").then(function(response) {
      $scope.categorias_iva = response.data;
    });
    //
  });
