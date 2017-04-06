'use strict';

/**
 * @ngdoc function
 * @name financieraClienteApp.controller:CdpCdpConsultaCtrl
 * @description
 * # CdpCdpConsultaCtrl
 * Controller of the financieraClienteApp
 */
angular.module('financieraClienteApp')
.factory("disponibilidad",function(){
        return {};
  })
  .controller('CdpCdpConsultaCtrl', function ($window,disponibilidad,$scope,financieraRequest) {
    var self = this;
    self.gridOptions = {
      enableFiltering : true,
      enableSorting : true,
      enableRowSelection: true,
      enableRowHeaderSelection: false,
      columnDefs : [
        {field: 'Id',             visible : false},
        {field: 'NumeroDisponibilidad',   displayName: 'Consecutivo'},
        {field: 'Vigencia',       cellClass:'alignleft'},
        {field: 'FechaRegistro' , displayName : 'Fecha de Registro' , cellTemplate: '<span>{{row.entity.FechaRegistro | date:"yyyy-MM-dd":"+0900"}}</span>'},
        {field: 'Estado.Nombre', displayName : 'Estado'},
        {field: 'Solicitud.Necesidad.DependenciaSolicitante.Nombre' , displayName : 'Dependencia Solicitante'}
      ]

    }
    self.gridOptions.multiSelect = false;
    financieraRequest.get('disponibilidad','limit=0').then(function(response) {
      self.gridOptions.data = response.data;
    });
    self.gridOptions.onRegisterApi = function(gridApi){
      self.gridApi = gridApi;
      gridApi.selection.on.rowSelectionChanged($scope,function(row){
        $scope.disponibilidad = disponibilidad;
        $scope.disponibilidad.Id = row.entity.Id;
        console.log(row);
        $window.location.href = '#/cdp/cdp_detalle';
      });
    };
  });
