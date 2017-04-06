'use strict';

/**
 * @ngdoc directive
 * @name financieraClienteApp.directive:apropiaciones/apropiacionFuente
 * @description
 * # apropiaciones/apropiacionFuente
 */
angular.module('financieraClienteApp')
  .directive('apropiacionFuente', function (factoriaExtra) {
    return {
            restrict: 'E',
            scope:{
                apropid:'='
            },
            templateUrl: 'views/directives/apropiaciones/apropiacion_fuente.html',
            controller:function($scope){
              var self = this;


            self.gridOptions_fuentes_apropiacion = {
                    enableRowSelection: true,
                    enableSelectAll: true,
                    enableFiltering: true,

                    columnDefs : [
                      {field: 'Id',             visible:false},
                      {field: 'FuenteFinanciacion.Descripcion',            displayName: 'Fuente de Financiamiento'},
                      {field: 'FuenteFinanciacion.Sigla',            displayName: 'Sigla Fuente de Financiamiento'},
                      {name: 'valor', displayName: 'Valor necesario' , type: 'number'}
                    ]
                  };

                factoriaExtra.get('fuente_financiacion_apropiacion',$.param({query: "Apropiacion:" + $scope.apropid,limit: 0,})).then(function(response) {
                  if (response.data==null) {
                    self.gridOptions_fuentes_apropiacion.data =[];
                  } else {
                    self.gridOptions_fuentes_apropiacion.data = response.data;
                  }
                });

                self.gridOptions_apropiacion = {};

                factoriaExtra.get('apropiacion',$.param({query: "Id:" + $scope.apropid,limit: 0,})).then(function(response) {
                  self.gridOptions_apropiacion.data = response.data;
                  });

              /*  self.gridOptions_fuentes_apropiacion.onRegisterApi = function(gridApi){
                      //set gridApi on scope
                      self.gridApi = gridApi;
                      gridApi.selection.on.rowSelectionChanged($scope,function(row){
                        $scope.fuentes=self.gridApi.selection.getSelectedRows();
                      });
                    };*/
                //$scope.gridHeight = self.gridOptions_fuentes_apropiacion.rowHeight * 2 + (self.gridOptions_fuentes_apropiacion.data.length * self.gridOptions_fuentes_apropiacion.rowHeight);

            },
            controllerAs:'d_apropiacionFuente'
    };
  });
