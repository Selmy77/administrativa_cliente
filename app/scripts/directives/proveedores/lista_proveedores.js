'use strict';

/**
 * @ngdoc directive
 * @name financieraClienteApp.directive:proveedores/listaProveedores
 * @description
 * # proveedores/listaProveedores
 */
angular.module('financieraClienteApp')
.directive('listaProveedores', function (agoraRequest) {
  return {
    restrict: 'E',
    scope : {
        proveedor:'='
      },

    templateUrl: 'views/directives/proveedores/lista_proveedores.html',
    controller:function($scope){
      var self = this;
      self.gridOptions_beneficiario = {
        enableRowSelection: true,
    enableRowHeaderSelection: false,
    enableFiltering: true,
    columnDefs : [
      {field: 'Id',             visible : false},
      {field: 'Tipopersona',   displayName: 'Tipo'},
      {field: 'NumDocumento',   displayName: 'Documento No'},
      {field: 'NomProveedor',   displayName: 'Nombre'}
    ]

  };

  agoraRequest.get('informacion_proveedor','limit=0').then(function(response) {
    self.gridOptions_beneficiario.data = response.data;
  });





  self.gridOptions_beneficiario.onRegisterApi = function(gridApi){
    //set gridApi on scope
    self.gridApi = gridApi;
    gridApi.selection.on.rowSelectionChanged($scope,function(row){
      $scope.proveedor = row.entity
    });
  };
  self.gridOptions_beneficiario.multiSelect = false;











    },
    controllerAs:'d_listaProveedores'
  };



});
