'use strict';

/**
 * @ngdoc directive
 * @name financieraClienteApp.directive:cuentasContables/listaPlanesCuentas
 * @description
 * # cuentasContables/listaPlanesCuentas
 */
angular.module('financieraClienteApp')
  .directive('listaPlanesCuentas', function(financieraRequest) {
    return {
      restrict: 'E',
      scope:{
          plansel:'=?',
          seleccion: '=?',
          recargar: '=?'
        },
      link: function(scope, element, attrs){
        scope.bsel = 'seleccion' in attrs;
        scope.bcancelsel= 'seleccion' in attrs || 'plansel' in attrs;
      },
      templateUrl: 'views/directives/cuentas_contables/lista_planes_cuentas.html',
      controller: function($scope) {
        var self = this;

        self.seleccionar_plan=function(){
          $scope.seleccion=$scope.plansel;
        };

        self.cancelar_seleccion=function(){
          $scope.gridApi.selection.clearSelectedRows();
          $scope.seleccion={};
          $scope.plansel={};
        };

        $scope.$watch('recargar',function(){
          self.cargar_datos();
        });


        //-----

        $scope.gridHeight = 240; //default 5 rows if rowHeight is 40

        $scope.auto_gridHeight = function(rows) {
          console.log(rows);
          if (!isNaN(rows) && rows !== null) {
            $scope.gridHeight = self.gridOptions.rowHeight + (rows * self.gridOptions.rowHeight);
          } else {
            $scope.gridHeight = 240;
          }

        };

        self.gridOptions = {
          rowHeight: 40,
          enableHorizontalScrollbar: true,
          enableRowSelection: true,
          enableRowHeaderSelection: false,
          enableFiltering: false,
          enableSorting: true,
          treeRowHeaderAlwaysVisible: false,
          showTreeExpandNoChildren: true,
          rowEditWaitInterval: -1,
          columnDefs: [{
              field: 'Id',
              visible: false
            },
            {
              field: 'Nombre',
              cellClass: 'text-success',
              headerCellClass:'text-info',
              cellTooltip: function(row, col) {
                return  row.entity.Nombre;
              }
            },
            {
              field: 'Descripcion',
              headerCellClass:'text-info',
              cellTooltip: function(row, col) {
                return  row.entity.Descripcion;
              }
            },
            {
              field: 'UnidadEjecutora.Nombre',
              displayName: 'Unidad Ejecutora',
              headerCellClass:'text-info',
              cellTooltip: function(row, col) {
                return  row.entity.UnidadEjecutora.Nombre + " <"+row.entity.UnidadEjecutora.Entidad.Nombre+">";
              }
            }
          ]

        };

        self.gridOptions.multiSelect = false;
        self.gridOptions.modifierKeysToMultiSelect = false;
        self.gridOptions.noUnselect = true;
        self.gridOptions.onRegisterApi = function(gridApi) {
          $scope.gridApi = gridApi;
          gridApi.selection.on.rowSelectionChanged($scope, function() {
            $scope.plansel = $scope.gridApi.selection.getSelectedRows()[0];
            console.log(self.plan);
          });
        };


        self.cargar_datos=function(){
          financieraRequest.get('plan_cuentas', $.param({
            sortby: "Id",
            order: "asc",
            limit: 0
          })).then(function(response) {
            self.gridOptions.data = response.data;
          });
        };



        //----
        self.cargar_datos();

      },
      controllerAs: 'd_listaPlanesCuentas'
    };
  });
