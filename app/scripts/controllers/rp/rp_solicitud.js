'use strict';

/**
 * @ngdoc function
 * @name contractualClienteApp.controller:RpSolicitudCtrl
 * @description
 * # RpSolicitudCtrl
 * Controller of the contractualClienteApp
 */
angular.module('contractualClienteApp')
  .controller('RpSolicitudCtrl', function(coreRequest,$window,agoraRequest,contrato,administrativaRequest,$scope,financieraRequest,financieraMidRequest,$translate) {
    var self = this;
    self.contrato = contrato;
    $scope.rubroVacio=false;
    self.CurrentDate = new Date();
    var mes=self.CurrentDate.getMonth()+1;
    var dia=self.CurrentDate.getDay();
    var ano=self.CurrentDate.getFullYear();
    self.alertas = false;
    self.alerta = "";
    self.valor_rp = "";
    self.compromiso = null;
    self.rubros_seleccionados = [];
    self.rubros_select = [];
    self.responsable = "";
    self.masivo_seleccion = false;
    var Solicitud_id;
    var solicitud_datos;
    self.masivo_radio = {
      0:{
        nombre : "Si",
        valor: true
      },
      1:{
        nombre : "No",
        valor: false
      }
    };

    self.dep_ned = {
      JefeDependenciaSolicitante: 18
    };

    coreRequest.get('jefe_dependencia/'+self.dep_ned.JefeDependenciaSolicitante, ''
    ).then(function(response) {
      self.dependencia_solicitante_data = response.data;
    });

    self.gridOptions_cdp = {
     enableRowSelection: true,
     enableRowHeaderSelection: false,
     enableFiltering: true,

  columnDefs : [
    {field: 'Id',             visible : false},
    {field: 'Vigencia',   displayName: 'Vigencia'},
    {field: 'NumeroDisponibilidad',   displayName: 'Consecutivo'},
    {field: 'Solicitud.SolicitudDisponibilidad.Necesidad.Objeto',   displayName: 'Objeto'},
    {field: 'Solicitud..DependenciaSolicitante.Nombre',   displayName: 'Ordenador'},
  ]

};
financieraRequest.get('disponibilidad','limit=-1&query=Estado.Nombre__not_in:Agotado').then(function(response) {
  self.gridOptions_cdp.data = response.data;
  angular.forEach(self.gridOptions_cdp.data, function(data){
    financieraMidRequest.get('disponibilidad/SolicitudById/'+data.Solicitud,'').then(function(response) {
        data.Solicitud = response.data[0];
        });

      });

});

self.gridOptions_cdp.onRegisterApi = function(gridApi){
  //set gridApi on scope
  self.gridApi = gridApi;
  gridApi.selection.on.rowSelectionChanged($scope,function(row){
    self.rubros_seleccionados = [];
    self.cdp = row.entity;
    var CdpId = self.cdp.Solicitud.SolicitudDisponibilidad.Id;
    administrativaRequest.get('solicitud_disponibilidad','query=Id:'+CdpId).then(function(response){
      $scope.necesidad=response.data[0];
    });

    agoraRequest.get('informacion_persona_natural', 'query=Id:'+self.cdp.Responsable).then(function(response) {
      if(response.data !== null){
      self.responsable = response.data[0];
    }else{
        self.responsable = "";
    }
    });

    financieraRequest.get('disponibilidad_apropiacion','limit=-1&query=Disponibilidad.Id:'+self.cdp.Id).then(function(response) {

      $scope.rubros = response.data;
      self.gridOptions_rubros.data = response.data;
      angular.forEach($scope.rubros, function(data){
          var rp = {
            Disponibilidad : data.Disponibilidad, // se construye rp auxiliar para obtener el saldo del CDP para la apropiacion seleccionada
            Apropiacion : data.Apropiacion
          };
          financieraRequest.post('disponibilidad/SaldoCdp',rp).then(function(response){
            data.Saldo  = response.data;
          });

        });
    });
  });
};
self.gridOptions_cdp.multiSelect = false;

    self.gridOptions_compromiso = {
      enableRowSelection: true,
      enableRowHeaderSelection: false,
      multiSelect: false,
      columnDefs: [{
          field: 'Id',
          displayName: $translate.instant('NUMERO'),
          width: '20%'
        },
        {
          field: 'Vigencia',
          displayName: $translate.instant('VIGENCIA'),
          width: '20%'
        },
        {
          field: 'Objeto',
          displayName: $translate.instant('OBJETO'),
          width: '60%'
        }
      ],
      onRegisterApi: function(gridApi) {
        self.gridApi = gridApi;

      }
    };

    self.gridOptions_rubros = {
      enableRowSelection: true,
      enableRowHeaderSelection: false,
      multiSelect: false,
      enableVerticalScrollbar : 0,
      enableHorizontalScrollbar : 0,
      columnDefs: [{
          field: 'Apropiacion.Rubro.Codigo',
          displayName: $translate.instant('CODIGO'),
          width: "25%",
        },
        {
          field: 'Apropiacion.Rubro.Descripcion',
          displayName: $translate.instant('NOMBRE'),
          width: "50%",
        },
        {
          field: 'FuenteFinanciamiento.Descripcion',
          displayName: $translate.instant('FUENTE_FINANCIAMIENTO'),
          width: "25%",
        }
      ],
    };

    self.gridOptions_rubros.onRegisterApi = function(gridApi){
      self.gridApi = gridApi;
      gridApi.selection.on.rowSelectionChanged($scope,function(row){
        self.selectRubro = row.entity;
      });
    };


    $scope.getTableStyle= function() {
      var rowHeight=30;
      var headerHeight=45;
      return {
      height: (self.gridOptions_rubros.data.length * rowHeight + headerHeight) + "px"
      };
    };

    financieraRequest.get('compromiso', 'limit=0').then(function(response) {
      self.gridOptions_compromiso.data = response.data;
    });

    self.proveedor = {

    };
    self.cdp = {

    };

    self.rubros = {

    };
    self.rubroSeleccionado = {

    };


    if (self.cdp.Id !== null) {
      for (var i = 0; i < self.rubros.length; i++) {
        var saldo = self.DescripcionRubro(rubros[i].Id);
        rubros[i].saldo = saldo;
      }
    }

    self.agregarRubro = function(id) {
      var rubro_seleccionado = self.selectRubro;
      var bandera = true;

      $scope.seleccionado= rubro_seleccionado;
      if(rubro_seleccionado!=undefined){
        for (var i = 0; i < self.rubros_seleccionados.length; i++) {
          if (self.rubros_seleccionados[i].Id === rubro_seleccionado.Id) {
            bandera = false;
          }
        }
        if(bandera === true){
          self.rubros_seleccionados.push(rubro_seleccionado);
        }else{
          swal("Alertas", "Este rubro ya fue agregado", "error");
        }
      }else{
        swal("Alertas", "Debe seleccionar un rubro para agregar", "error");
      }
    }

    self.quitarRubro = function(id) {

      for (var i = 0; i < self.rubros_select.length; i++) {
        if (self.rubros_select[i].Id === id) {

          self.rubros.push(self.rubros_select[i]);
          self.rubros_select.splice(i, 1);
        }
      }
      for (var i = 0; i < self.rubros_seleccionados.length; i++) {

        if (self.rubros_seleccionados[i].Id === id) {
          self.rubros_seleccionados.splice(i, 1)
        }
      }
    }

    self.DescripcionRubro = function(id) {
      var rubro;
      for (var i = 0; i < self.rubros.length; i++) {

        if (self.rubros[i].Id === id) {
          rubro = self.rubros[i];
        }
      }
      return rubro
    };

    $scope.saldosValor = function() {
      $scope.banderaRubro = true;
      angular.forEach(self.rubros_seleccionados, function(v) {
        if (v.Valor < v.ValorAsignado || v.ValorAsignado===0 || isNaN(v.ValorAsignado) || v.ValorAsignado === undefined) {
          $scope.banderaRubro = false;
        }
      });
    };

    self.Registrar = function() {
      $scope.saldosValor();
      self.alerta_registro_rp = ["No se pudo solicitar el rp"];
      if (self.cdp.NumeroDisponibilidad === null) {
        swal("Alertas", "Debe seleccionar el CDP objetivo del RP", "error");
        self.alerta_registro_rp = ["Debe seleccionar el CDP objetivo del RP"];
      } else if (self.rubros_seleccionados.length === 0) {
        swal("Alertas", "Debe seleccionar el Rubro objetivo del RP", "error");
        self.alerta_registro_rp = ["Debe seleccionar el Rubro objetivo del RP"];
      } else if (self.compromiso === null) {
        swal("Alertas", "Debe seleccionar el Compromiso del RP", "error");
        self.alerta_registro_rp = ["Debe seleccionar el Compromiso del RP"];
      } else if ($scope.banderaRubro === false) {
        swal({
          title: 'Error!',
          text: 'Valor incorrecto del registro presupuestal',
          type: 'error',
          confirmButtonText: 'Corregir'
        });
      }
      else {

        for (var i = 0; i < self.rubros_seleccionados.length; i++) {
          self.rubros_seleccionados[i].ValorAsignado = parseFloat(self.rubros_seleccionados[i].ValorAsignado);
        }

        var Solicitud_rp = {
          Vigencia: 2017,
          FechaSolicitud: self.CurrentDate,
          Cdp: self.cdp.Id,
          Expedida: false,
          NumeroContrato: self.contrato.Id,
          VigenciaContrato: self.contrato.Vigencia.toString(),
          Compromiso: self.compromiso.Id,
          Justificacion_rechazo: 0,
          Masivo : self.masivo_seleccion
        };

          administrativaRequest.post('solicitud_rp', Solicitud_rp).then(function(response) {
            Solicitud_id = response.data;
            console.log(dia+" "+mes+" "+ano);
            for (var i = 0; i < self.rubros_seleccionados.length; i++) {
              var Disponibilidad_apropiacion_solicitud_rp = {
                DisponibilidadApropiacion: self.rubros_seleccionados[i].Id,
                SolicitudRp : Solicitud_id,
                Monto: self.rubros_seleccionados[i].ValorAsignado,
              };
              administrativaRequest.post('disponibilidad_apropiacion_solicitud_rp', Disponibilidad_apropiacion_solicitud_rp).then(function(responseD) {
              });
            }

            administrativaRequest.get('solicitud_rp','query=Id:'+Solicitud_id).then(function(response){
              solicitud_datos = response.data[0];
              console.log(solicitud_datos.FechaSolicitud);
              var fecha = new Date(solicitud_datos.FechaSolicitud);
              dia = fecha.getDate()+1;
              mes = fecha.getMonth()+1;
              ano = fecha.getFullYear();
              var fecha_solicitud = dia +"/"+mes+"/"+ano;
            swal({
              html: "<label>"+$translate.instant('INSERCION_RP')+":</label><br><br><label><b>"+$translate.instant('NUMERO_SOLICITUD')+":</b></label> "
              +solicitud_datos.Id+"<br><label><b>"+$translate.instant('VIGENCIA_SOLICITUD')+":</b></label> " + solicitud_datos.Vigencia + "<br><label><b>"+$translate.instant('FECHA_SOLICITUD')+":</b></label>:"
              +fecha_solicitud+ "<br><label><b>"+$translate.instant('NUMERO_CONTRATO')+":</b></label>" + solicitud_datos.NumeroContrato + "<br><label><b>"+$translate.instant('VIGENCIA_CONTRATO')+":</b></label>"
              + solicitud_datos.VigenciaContrato,
              type: "success",
              showCancelButton: true,
              confirmButtonColor: "#449D44",
              cancelButtonColor: "#C9302C",
              confirmButtonText: $translate.instant('VOLVER_CONTRATOS'),
              cancelButtonText: $translate.instant('SALIR'),
            }).then(function() {
              //si da click en ir a contratistas
              $window.location.href = '#/rp_solicitud_personas';
            }, function(dismiss) {

              if (dismiss === 'cancel') {
                //si da click en Salir
                $window.location.href = '#';
              }
            });
            });
          });

      }
    };

    self.gridOptions_compromiso.onRegisterApi = function(gridApi) {
      self.gridApi = gridApi;
      gridApi.selection.on.rowSelectionChanged($scope, function(row) {
        self.compromiso = row.entity;
      });
    };
  });
