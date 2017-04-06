'use strict';

/**
 * @ngdoc directive
 * @name financieraClienteApp.directive:concepto/conceptoPorRubroListar
 * @description
 * # concepto/conceptoPorRubroListar
 */
angular.module('financieraClienteApp')
  .directive('conceptoPorRubroListar', function (financieraRequest, $timeout) {
    return {
      restrict: 'E',
      scope:{
          rubroid:'=?',
          concepto: '=?'
        },

      templateUrl: 'views/directives/concepto/concepto_por_rubro_listar.html',
      controller:function($scope){
        var self = this;
        self.gridOptions_conceptos = {
          enableRowSelection: true,
          enableRowHeaderSelection: false,
          columnDefs : [
            {field: 'Id',                         visible : false},
            {field: 'Codigo',                     displayName: 'Codigo'},
            {field: 'Nombre',                     displayName: 'Nombre'},
            {field: 'TipoConcepto.Nombre',        displayName: 'Tipo'}
          ]
        };
        // refrescar
        self.refresh = function() {
          $scope.refresh = true;
          $timeout(function() {
            $scope.refresh = false;
          }, 0);
        };
        //
        $scope.$watch('rubroid', function(){
          self.refresh();
          if ($scope.rubroid){
            financieraRequest.get('concepto',
            $.param({
              query: "Rubro.Id:" + $scope.rubroid,
              limit:0
            })
            ).then(function(response) {
              self.gridOptions_conceptos.data = response.data;
            });
          }
        })

        self.gridOptions_conceptos.onRegisterApi = function(gridApi){
            //set gridApi on scope
            self.gridApi = gridApi;
            gridApi.selection.on.rowSelectionChanged($scope,function(row){
              $scope.concepto = row.entity
            });
          };
          self.gridOptions_conceptos.multiSelect = false;



        //
      },
      controllerAs:'d_conceptoPorRubroListar'
    };
  });
