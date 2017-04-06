'use strict';

/**
 * @ngdoc directive
 * @name financieraClienteApp.directive:unidadEjecutora/ueListar
 * @description
 * # unidadEjecutora/ueListar
 */
angular.module('financieraClienteApp')
  .directive('ueListar', function (financieraRequest) {
    return {
      restrict: 'E',
      scope:{
          unidaejecutora:'='
        },

      templateUrl: 'views/directives/unidad_ejecutora/ue_listar.html',
      controller:function($scope){
        var self = this;
        self.gridOptions_unidad_ejecutora = {
          enableRowSelection: true,
          enableRowHeaderSelection: false,

          columnDefs : [
            {field: 'Id',             visible : false},
            {field: 'Nombre',         displayName: 'Nombre'},
            {field: 'Descripcion',    displayName: 'Descripcion'}
          ]
        };

        financieraRequest.get('unidad_ejecutora','limit=0').then(function(response) {
          self.gridOptions_unidad_ejecutora.data = response.data;
        });

        self.gridOptions_unidad_ejecutora.onRegisterApi = function(gridApi){
            //set gridApi on scope
            self.gridApi = gridApi;
            gridApi.selection.on.rowSelectionChanged($scope,function(row){
              $scope.unidaejecutora = row.entity
            });
          };
          self.gridOptions_unidad_ejecutora.multiSelect = false;

        //
      },
      controllerAs:'d_ueListar'
    };
  });
