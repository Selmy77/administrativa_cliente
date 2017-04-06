'use strict';

/**
 * @ngdoc directive
 * @name financieraClienteApp.directive:rp/rpPorProveedorListar
 * @description
 * # rp/rpPorProveedorListar
 */
angular.module('financieraClienteApp')
  .directive('rpPorProveedorListar', function (financieraRequest, $timeout) {
    return {
      restrict: 'E',
      scope:{
          beneficiaroid:'=?',
          rpselect: '=?'
        },

      templateUrl: 'views/directives/rp/rp_por_proveedor_listar.html',
      controller:function($scope){
        var self = this;
        self.gridOptions_rp = {
          enableRowSelection: true,
          enableRowHeaderSelection: false,
          enableFiltering: true,

          columnDefs : [
            {field: 'Id',                             visible : false},
            {field: 'NumeroRegistroPresupuestal',     displayName: 'Numero RP'},
            {field: 'Estado.Nombre',                  displayName: 'Estado'},
            {field: 'Vigencia',                       displayName: 'Vigencia'}
          ]
        };
        // refrescar
        self.refresh = function() {
          $scope.refresh = true;
          $timeout(function() {
            $scope.refresh = false;
          }, 0);
        };

        $scope.$watch('beneficiaroid', function(){
          self.refresh();
          if($scope.beneficiaroid != undefined){
            financieraRequest.get('registro_presupuestal',
              $.param({
                  query: "Beneficiario:" + $scope.beneficiaroid,
                  limit: 0,
              })).then(function(response) {
                self.gridOptions_rp.data = response.data;
            });
          }
        })

        self.gridOptions_rp.onRegisterApi = function(gridApi){
            //set gridApi on scope
            self.gridApi = gridApi;
            gridApi.selection.on.rowSelectionChanged($scope,function(row){
              $scope.rpselect = row.entity;
              //consulta datos del rp
              financieraRequest.get('registro_presupuestal_disponibilidad_apropiacion',  //en el futuro será una servició con calculo de suma total
                $.param({
                    query: "RegistroPresupuestal.Id:" + $scope.rpselect.Id,
                    limit: 0,
                })).then(function(response) {
                  self.rp_select_de_consulta = response.data;
              });
              //Fin consulta datos del rp
            });
          };
          self.gridOptions_rp.multiSelect = false;

      //
      },
      controllerAs:'d_rpPorProveedorListar'
    };
  });
