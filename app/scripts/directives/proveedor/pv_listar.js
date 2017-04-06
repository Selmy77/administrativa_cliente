'use strict';

/**
 * @ngdoc directive
 * @name financieraClienteApp.directive:proveedor/pvListar
 * @description
 * # proveedor/pvListar
 */
angular.module('financieraClienteApp')
  .directive('pvListar', function (administrativaRequest) {
    return {
      restrict: 'E',
      scope:{
          proveedor:'='
        },

      templateUrl: 'views/directives/proveedor/pv_listar.html',
      controller:function($scope){
        var self = this;
        self.gridOptions_proveedor = {
          enableRowSelection: true,
          enableRowHeaderSelection: false,
          enableFiltering: true,

          columnDefs : [
            {field: 'Id',              visible : false},
            {field: 'Tipopersona',     displayName: 'Tipo Persona'},
            {field: 'NumDocumento',    displayName: 'Num Documento'},
            {field: 'NomProveedor',    displayName: 'Nombe'}
          ]
        };

        administrativaRequest.get('informacion_proveedor','limit=0').then(function(response) {
          self.gridOptions_proveedor.data = response.data;
        });

        self.gridOptions_proveedor.onRegisterApi = function(gridApi){
            //set gridApi on scope
            self.gridApi = gridApi;
            gridApi.selection.on.rowSelectionChanged($scope,function(row){
              $scope.proveedor = row.entity
            });
          };
          self.gridOptions_proveedor.multiSelect = false;
        //
      },
      controllerAs:'d_pvListar'
    };
  });
