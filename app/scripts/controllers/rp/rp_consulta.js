'use strict';

/**
 * @ngdoc function
 * @name financieraClienteApp.controller:RpRpConsultaCtrl
 * @description
 * # RpRpConsultaCtrl
 * Controller of the financieraClienteApp
 */
angular.module('financieraClienteApp')
.factory("rp",function(){
        return {};
  })
  .controller('RpRpConsultaCtrl', function ($window,rp,$scope,financieraRequest) {
    var self = this;
    self.gridOptions = {
      enableFiltering : true,
      enableSorting : true,
      enableRowSelection: true,
      enableRowHeaderSelection: false,
      columnDefs : [
        {field: 'Id',             visible : false},
        {field: 'NumeroRegistroPresupuestal',   displayName: 'Consecutivo'},
        {field: 'Vigencia',       cellClass:'alignleft'},
        {field: 'FechaMovimiento' , displayName : 'Fecha de Registro' , cellTemplate: '<span>{{row.entity.FechaMovimiento | date:"yyyy-MM-dd":"+0900"}}</span>'},
        {field: 'Estado.Nombre', displayName : 'Estado'},
      ]

    };
    self.gridOptions.multiSelect = false;
    financieraRequest.get('registro_presupuestal','limit=0').then(function(response) {
      self.gridOptions.data = response.data;
    });
    self.gridOptions.onRegisterApi = function(gridApi){
      self.gridApi = gridApi;
      gridApi.selection.on.rowSelectionChanged($scope,function(row){
        $scope.rp = rp;
        $scope.rp.Id = row.entity.Id;
        console.log(row);
        $window.location.href = '#/rp/rp_detalle';
      });
    };
  });
