'use strict';

/**
 * @ngdoc function
 * @name financieraClienteApp.controller:CdpCdpDetalleCtrl
 * @description
 * # CdpCdpDetalleCtrl
 * Controller of the financieraClienteApp
 */
angular.module('financieraClienteApp')
.controller('CdpCdpDetalleCtrl', function ( $scope, financieraRequest,financieraMidRequest,disponibilidad,uiGridService, $mdDialog) {




  var self = this;
  self.disponibilidad = disponibilidad;
  self.formVisibility = false;
  self.alertas = "";
  self.ShowForm = function(){
 self.formVisibility = !self.formVisibility;
  };

  self.anular = function(){
    var valor = 0;
    var disponibilidad_apropiacion =[];
    var anulacion = {
      Motivo : self.motivo,
      TipoAnulacion : self.tipoAnulacion
    };
    if (self.tipoAnulacion === "T"){
      disponibilidad_apropiacion = self.gridOptions.data;
    }else if (self.tipoAnulacion === "P"){
      disponibilidad_apropiacion[0] = $scope.apropiacion;
      valor = parseFloat(self.Valor);
    }
    var datos_anulacion = {
      Anulacion : anulacion,
      Disponibilidad_apropiacion : disponibilidad_apropiacion,
      Valor : valor
    };
    financieraRequest.post('disponibilidad/Anular', datos_anulacion).then(function(response) {
        self.alerta_anulacion_cdp = response.data;
        swal("Alertas", self.alerta_anulacion_cdp, "success");
      });

  };



  self.gridOptions = {
    enableRowSelection: true,
    enableRowHeaderSelection: false,
     columnDefs : [
      {field: 'Id',             visible : false},
      {field: 'Apropiacion.Rubro.Codigo', displayName: 'Codigo'},
      {field: 'Apropiacion.Rubro.Descripcion',  displayName: 'Descripcion'},
      {field: 'Apropiacion.Rubro.Estado',    displayName: 'Estado' },
      {field: 'Valor', cellFilter: 'currency' },
      {field: 'Saldo', cellFilter: 'currency'}
    ]
  };
  self.gridOptions.multiSelect = false;

  self.gridOptions.onRegisterApi = function(gridApi){
    //set gridApi on scope
    self.gridApi = gridApi;
    gridApi.selection.on.rowSelectionChanged($scope,function(row){
      $scope.apropiacion = row.entity;

    });
  };


  financieraRequest.get('disponibilidad','query=Id:'+disponibilidad.Id).then(function(response) {
      self.detalle = response.data;
      angular.forEach(self.detalle, function(data){
        financieraMidRequest.get('disponibilidad/SolicitudById/'+data.Solicitud,'').then(function(response) {
            data.Solicitud = response.data[0];
            console.log(data);
            });

          });
  });

    financieraRequest.get('disponibilidad_apropiacion','limit=0&query=Disponibilidad.Id:'+disponibilidad.Id).then(function(response) {
      self.gridOptions.data = response.data;
      angular.forEach(self.gridOptions.data, function(data){
          var saldo;
          var rp = {
            Disponibilidad : data.Disponibilidad, // se construye rp auxiliar para obtener el saldo del CDP para la apropiacion seleccionada
            Apropiacion : data.Apropiacion
          };
          financieraRequest.post('disponibilidad/SaldoCdp',rp).then(function(response){
            data.Saldo  = response.data;
          });

        });
        self.gridHeight = uiGridService.getGridHeight(self.gridOptions);
    });



});
