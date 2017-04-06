'use strict';

/**
 * @ngdoc directive
 * @name financieraClienteApp.directive:rubros/rubrosPorRpSeleccionMultiple
 * @description
 * # rubros/rubrosPorRpSeleccionMultiple
 */
angular.module('financieraClienteApp')
  .directive('rubrosPorRpSeleccionMultiple', function (financieraRequest, $timeout) {
    return {
      restrict: 'E',
      scope:{
        rpid:'=?',
        rubros:'=?'
        },

      templateUrl: 'views/directives/rubros/rubros_por_rp_seleccion_multiple.html',
      controller:function($scope){
        var self = this;
        self.gridOptions_rubros = {
          enableRowSelection: true,
          enableRowHeaderSelection: true,
          enableSelectAll: true,
          columnDefs : [
            {field: 'DisponibilidadApropiacion.Apropiacion.Rubro.Id',                           visible : false},
            {field: 'DisponibilidadApropiacion.Apropiacion.Rubro.Codigo',                       displayName: 'Codigo Rubro'},
            {field: 'DisponibilidadApropiacion.Apropiacion.Rubro.Vigencia',                     displayName: 'Vigencia Rubro'},
            {field: 'DisponibilidadApropiacion.Apropiacion.Rubro.Descripcion',                  displayName: 'Descripción Rubro'},
            {field: 'RegistroPresupuestal.NumeroRegistroPresupuestal',                          displayName: 'Registro Presupuestal'},
            {field: 'DisponibilidadApropiacion.Disponibilidad.NumeroDisponibilidad',            displayName: 'Disponibilidad'}
          ],
          onRegisterApi : function(gridApi){
              //set gridApi on scope
              self.gridApi = gridApi;
          }
        };
        self.gridOptions_rubros.multiSelect = true;
        // refrescar
        self.refresh = function() {
          $scope.refresh = true;
          $timeout(function() {
            $scope.refresh = false;
          }, 0);
        };
        //
        $scope.$watch('rpid', function(){
          self.refresh();
          if ($scope.rpid != undefined){
            financieraRequest.get('registro_presupuestal_disponibilidad_apropiacion',
            $.param({
              query: "RegistroPresupuestal.Id:" + $scope.rpid,
              limit:0
            })
            ).then(function(response) {
              self.gridOptions_rubros.data = response.data;
            });
          }
        })
        //
        self.seleccionar_rubros = function(){
          $scope.rubros = [];
          $scope.rubros_seleccion = self.gridApi.selection.getSelectedRows();
          angular.forEach($scope.rubros_seleccion, function(rr){
            $scope.rubros.push(rr.DisponibilidadApropiacion.Apropiacion.Rubro.Id)
          })
        }
        // fin
      },
      controllerAs:'d_rubrosPorRpSeleccionMultiple'
    };
  });
