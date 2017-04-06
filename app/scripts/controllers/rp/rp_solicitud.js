'use strict';

/**
 * @ngdoc function
 * @name financieraClienteApp.controller:RpSolicitudCtrl
 * @description
 * # RpSolicitudCtrl
 * Controller of the financieraClienteApp
 */
angular.module('financieraClienteApp')
  .controller('RpSolicitudCtrl', function ($window,rp,$scope,financieraRequest,$routeParams,argoRequest) {
    var self=this;
    //self.solicitudPersonas=solicitudPersonas;
    self.Contrato = $routeParams.contrato;
    self.Vigencia = $routeParams.vigencia;
    self.Nombre = $routeParams.nombre;
    self.Valor = $routeParams.valor;
    self.Documento = $routeParams.documento;
  //  console.log(solicitudPersonas);
  self.CurrentDate = new Date();
    self.alertas = false;
    self.alerta = "";
    self.valor_rp = "";
    self.rubros_seleccionados = [];
    self.rubros_select = [];

    self.gridOptions_compromiso = {
      enableRowSelection: true,
      enableRowHeaderSelection: false,
      multiSelect:false,
      columnDefs : [
        {field: 'Id',  displayName: 'Numero' , width: '20%'},
        {field: 'Vigencia',   displayName: 'Vigencia' , width: '20%'},
        {field: 'TipoCompromisoTesoral.Nombre',   displayName: 'Tipo Compromiso', width: '60%'}
      ]

    };
    financieraRequest.get('compromiso','limit=0').then(function(response) {
      self.gridOptions_compromiso.data = response.data;
      console.log(response.data);
    });

    /*
    self.gridOptions_compromiso.onRegisterApi = function(gridApi){
      self.gridApi = gridApi;
      gridApi.selection.on.rowSelectionChanged($scope,function(row){
        $scope.compromiso = row.entity;
        console.log($scope.compromiso);
      });
    };*/


    self.proveedor = {

    };
    self.cdp = {

    };

    self.rubros = {

    };
    self.rubroSeleccionado = {

    };

    self.limpiar = function(){
      self.proveedor = {

      };
      self.cdp = {

      };
      self.rubros = {

      };
      self.valor_rp = "";

      self.rubroSeleccionado = {

      };
    };
    if (self.cdp.Id != null){
      for (var i = 0 ; i < self.rubros.length ; i++){
        var saldo = self.DescripcionRubro(rubros[i].Id);
        rubros[i].saldo = saldo;
        alert(saldo);
      }
    }

    self.agregarRubro = function (id) {
      var rubro_seleccionado = self.DescripcionRubro(id);
      self.rubros_seleccionados.push(rubro_seleccionado);
      for (var i = 0 ; i < self.rubros.length ; i++){

        if(self.rubros[i].Id == id){
          self.rubros_select.push(rubro_seleccionado);
          self.rubros.splice(i, 1)
        }
      }
    }

    self.quitarRubro = function (id){

      for (var i = 0 ; i < self.rubros_select.length ; i++){
        console.log(self.rubros_select[i]);
        console.log(id);
        if(self.rubros_select[i].Id == id){

          self.rubros.push(self.rubros_select[i]);
          self.rubros_select.splice(i, 1)
        }
      }
      for (var i = 0 ; i < self.rubros_seleccionados.length ; i++){

        if(self.rubros_seleccionados[i].Id == id){
          self.rubros_seleccionados.splice(i, 1)
        }
      }
    }

    self.DescripcionRubro = function(id){
      var rubro;
      for (var i = 0 ; i < self.rubros.length ; i++){

        if(self.rubros[i].Id == id){
          rubro = self.rubros[i];

        }
      }
      return rubro
    };

    self.Registrar = function(){
        self.alerta_registro_rp = ["No se pudo solicitar el rp"];
      if(self.cdp.NumeroDisponibilidad == null){
        swal("Alertas", "debe seleccionar el CDP objetivo del RP", "error");
        self.alerta_registro_rp = ["debe seleccionar el CDP objetivo del RP"];
      }else if (self.rubros_seleccionados.length == 0){
        swal("Alertas", "debe seleccionar el Rubro objetivo del RP", "error");
        self.alerta_registro_rp = ["debe seleccionar el Rubro objetivo del RP"];
      }else{

        /*
        var estado = {Id : 1};
        var rp = {
          UnidadEjecutora : self.cdp.UnidadEjecutora ,
          Vigencia : self.cdp.Vigencia,
          Responsable : self.cdp.Responsable.Id,
          Estado : estado,
          Beneficiario : self.proveedor.Id,
          Compromiso: $scope.compromiso
        };*/
        console.log(self.rp);
        for (var i = 0 ; i < self.rubros_seleccionados.length ; i++){
          self.rubros_seleccionados[i].ValorAsignado = parseFloat(self.rubros_seleccionados[i].ValorAsignado);
        }

        var registro = {
          //rp : rp,
          rubros : self.rubros_seleccionados
        };

        var SolicitudRp = {
        	Vigencia:2017,
        	FechaSolicitud : self.CurrentDate,
          Cdp: self.cdp.NumeroDisponibilidad,
          Expedida: false,
          NumeroContrato: self.Contrato,
          VigenciaContrato:self.Vigencia,
          Compromiso:  self.compromiso.Id
        }
        argoRequest.post('solicitud_rp', SolicitudRp).then(function(response){
        self.alerta_registro_rp = response.data;
        angular.forEach(self.alerta_registro_rp, function(data){

          self.alerta = self.alerta + data + "\n";

        });

        var fechaFormato= SolicitudRp.FechaSolicitud.getDay()+"/"+SolicitudRp.FechaSolicitud.getMonth()+"/"+SolicitudRp.FechaSolicitud.getFullYear();

        swal({
            title: "Se inserto correctamente la solicitud del registro presupuestal con los siguientes datos:",
           html: "<br><h4><b>Vigencia solicitud:</b></h4> "+response.data.Vigencia+"<h4><b>Fecha solicitud:</b></h4>:"+fechaFormato+
           "<h4><b>Numero contrato:</b><h4>"+response.data.NumeroContrato+"<h4><b>Vigencia contrato:</b><h4>"+response.data.VigenciaContrato
           +"<h4><b>Compromiso identificador:</b><h4>"+response.data.Compromiso,
            type: "success",
            showCancelButton: true,
            confirmButtonColor: "#449D44",
            cancelButtonColor: "#C9302C",
            confirmButtonText: "Volver a contratistas",
            cancelButtonText: "Salir",
          }).then(function () {
            //si da click en ir a contratistas
            $window.location.href='/#/rp/rp_solicitud_personas';
          }, function (dismiss) {

            if (dismiss === 'cancel') {
              //si da click en Salir
              $window.location.href='#';
            }
          })

        });
      }
    };

    self.gridOptions_compromiso.onRegisterApi = function(gridApi){
      self.gridApi = gridApi;
      gridApi.selection.on.rowSelectionChanged($scope,function(row){
        self.compromiso = row.entity;
        console.log($self.compromiso);
      });
    };
  });
