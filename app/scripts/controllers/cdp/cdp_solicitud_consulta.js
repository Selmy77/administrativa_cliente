'use strict';

/**
 * @ngdoc function
 * @name financieraClienteApp.controller:CdpCdpSolicitudConsultaCtrl
 * @description
 * # CdpCdpSolicitudConsultaCtrl
 * Controller of the financieraClienteApp
 */
angular.module('financieraClienteApp')
.factory("solicitud_disponibilidad",function(){
        return {};
  })
  .controller('CdpCdpSolicitudConsultaCtrl', function (solicitud_disponibilidad,financieraRequest,financieraMidRequest, $window, uiGridConstants) {
    var self = this;
    self.alerta = "";
    self.message = 'Solicitudes de Disponibilidad Presupuestal';

    self.gridOptions = {
      enableFiltering : false,
      enableSorting : true,
      treeRowHeaderAlwaysVisible : false,
      showTreeExpandNoChildren: true,
      enableRowSelection: true,
      enableSelectAll: true,
      rowEditWaitInterval :-1,
      columnDefs : [
        {field: 'SolicitudDisponibilidad.Id',             visible : false},
        {field: 'SolicitudDisponibilidad.Numero',  displayName: 'Numero de Solicitud'},
        {field: 'DependenciaSolicitante.Nombre',  displayName: 'Dependencia Solicitante'},
        {field: 'DependenciaDestino.Nombre',  displayName: 'Dependencia Destino'},
        {field: 'SolicitudDisponibilidad.Vigencia',  displayName: 'Vigencia'},
        {field: 'SolicitudDisponibilidad.FechaSolicitud',  displayName: 'Fecha de Solicitud' ,  cellTemplate: '<span>{{row.entity.SolicitudDisponibilidad.FechaSolicitud | date:"yyyy-MM-dd":"+0900"}}</span>'},
        {
            field: 'Opciones' ,displayName: 'Opciones',
            cellTemplate: '<button class="btn" ng-click="grid.appScope.cdpSolicitudConsulta.ver_detalle_sol_disponibilidad(row)"  >ver</button>'
        }
      ],
      onRegisterApi : function( gridApi ) {
        self.gridApi = gridApi;
      }

    };
    //cargar datos de las Solicitudes
    financieraMidRequest.get('disponibilidad/Solicitudes','limit=0&query=Expedida:false&sortby=Id&order=desc').then(function(response) {
      self.gridOptions.data = response.data;


    });
    //-------------------------------


    //funcion para actualizar grid
    self.actualiza_solicitudes = function () {
      financieraMidRequest.get('disponibilidad/Solicitudes','limit=0&query=Expedida:false&sortby=Id&order=desc').then(function(response) {
        self.gridOptions.data = response.data;


      });
      };
    //----------------------------

    //generar la disponibilidad (peticion al mid api)
    self.generar_disponibilidad = function(){
        var solicitudes_a_generar = self.gridApi.selection.getSelectedRows();
        var solicitud = angular.copy(solicitudes_a_generar);
        for (var i=0; i < solicitud.length; i++){
          delete solicitud[i]["$$treeLevel"];
          console.log(solicitud[i]);
        }
        financieraMidRequest.post('disponibilidad/', solicitud).then(function(response){
          self.alerta_registro_cdp = response.data;
          angular.forEach(self.alerta_registro_cdp, function(data){

            self.alerta = self.alerta + data + "\n";

          });
          swal("Alertas", self.alerta, self.alerta_registro_cdp[0]);
          //alert(data);
        });
    };

    //ver el detalle de la solicitud
     self.ver_detalle_sol_disponibilidad = function(row){
        self.solicitud_disponibilidad = solicitud_disponibilidad;
        self.solicitud_disponibilidad.Id = row.entity.SolicitudDisponibilidad.Id;
        self.solicitud_disponibilidad.Necesidad = row.entity.SolicitudDisponibilidad.Necesidad.Id;
        $window.location.href = '#/cdp/cdp_solicitud_detalle';
     };
     //-----------------------------
  });
