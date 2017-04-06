'use strict';

/**
 * @ngdoc function
 * @name financieraClienteApp.controller:RpRpDetalleCtrl
 * @description
 * # RpRpDetalleCtrl
 * Controller of the financieraClienteApp
 */
angular.module('financieraClienteApp')
  .controller('RpRpDetalleCtrl', function ($scope,financieraRequest,financieraMidRequest,agoraRequest,uiGridService,rp) {
    var self = this;
    self.alerta = "";
    self.formVisibility = false;
    self.rp = rp;
    self.objeto = "";
    self.gridOptions = {
      rowHeight: 30,
      headerHeight : 30,
      enableRowSelection: true,
      enableRowHeaderSelection: false,
       columnDefs : [
        {field: 'Id',             visible : false},
        {field: 'DisponibilidadApropiacion.Apropiacion.Rubro.Codigo', displayName: 'Codigo'},
        {field: 'DisponibilidadApropiacion.Apropiacion.Rubro.Descripcion',  displayName: 'Descripcion'},
        {field: 'Valor',  cellFilter: 'currency' },
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
    financieraRequest.get('registro_presupuestal','query=Id:'+rp.Id).then(function(response) {
        self.detalle = response.data;
        angular.forEach(self.detalle, function(data){

          agoraRequest.get('informacion_proveedor/'+data.Beneficiario,'').then(function(response) {

                data.Beneficiario = response.data;

            });
          });
        angular.forEach(self.detalle, function(data){
          financieraRequest.get('registro_presupuestal_disponibilidad_apropiacion','query=RegistroPresupuestal.Id:'+data.Id).then(function(response) {
              self.gridOptions.data = response.data;
              data.Disponibilidad = response.data[0].DisponibilidadApropiacion.Disponibilidad;
              angular.forEach(self.gridOptions.data, function(data){
                var rpdata = {
                  Rp : data.RegistroPresupuestal,
                  Apropiacion : data.DisponibilidadApropiacion.Apropiacion
                };
                financieraRequest.post('registro_presupuestal/SaldoRp',rpdata).then(function(response){
                  data.Saldo  = response.data;
                });
                financieraMidRequest.get('disponibilidad/SolicitudById/'+data.DisponibilidadApropiacion.Disponibilidad.Solicitud,'').then(function(response) {
                    var solicitud = response.data
                    angular.forEach(solicitud, function(data){
                      self.objeto = data.SolicitudDisponibilidad.Necesidad.Objeto;

                    });

                  });
                });
                self.gridHeight = uiGridService.getGridHeight(self.gridOptions);
            });

        });
        console.log("detalle:");
        console.log(self.detalle);
      });
    self.ShowForm = function(){
  	   self.formVisibility = !self.formVisibility;
    };

    self.anular = function(){
      var valor = 0;
      var rp_apropiacion =[];
      var anulacion = {
        Motivo : self.motivo,
        TipoAnulacion : self.tipoAnulacion
      };
      if (self.tipoAnulacion === "T"){
        rp_apropiacion = self.gridOptions.data;
      }else if (self.tipoAnulacion === "P"){
        rp_apropiacion[0] = $scope.apropiacion;
        valor = parseFloat(self.Valor);
      }
      var datos_anulacion = {
        Anulacion : anulacion,
        Rp_apropiacion : rp_apropiacion,
        Valor : valor
      };
      financieraRequest.post('registro_presupuestal/Anular', datos_anulacion).then(function(response) {
          self.alerta_anulacion_rp = response.data;
          angular.forEach(self.alerta_anulacion_rp, function(data){

            self.alerta = self.alerta + data + "\n";

          });
          swal("Alertas", self.alerta, self.alerta_anulacion_rp[0]);
        });

    };


  });
