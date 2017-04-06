'use strict';

/**
 * @ngdoc function
 * @name financieraClienteApp.controller:RpRpRegistroCtrl
 * @description
 * # RpRpRegistroCtrl
 * Controller of the financieraClienteApp
 */
angular.module('financieraClienteApp')
  .controller('RpRpRegistroCtrl', function ($scope,financieraRequest,financieraMidRequest) {

    var self = this;
    self.alertas = false;
    self.alerta = "";
    self.valor_rp = "";
    self.rubros_seleccionados = [];
    self.rubros_select = [];

    self.gridOptions_compromiso = {
      enableRowSelection: true,
      enableRowHeaderSelection: false,

      columnDefs : [
        {field: 'Id',  displayName: 'Numero' , width: '20%'},
        {field: 'Vigencia',   displayName: 'Vigencia' , width: '20%'},
        {field: 'TipoCompromisoTesoral.Nombre',   displayName: 'Tipo Compromiso', width: '85%'}
      ]

    };
    financieraRequest.get('compromiso','limit=0').then(function(response) {
      self.gridOptions_compromiso.data = response.data;
      console.log(response.data);
    });

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
        self.alerta_registro_rp = ["No se pudo registrar el rp"];
      if(self.proveedor.NomProveedor == null){
        swal("Alertas", "debe seleccionar el Beneficiario objetivo del RP", "error");
        self.alerta_registro_rp = ["debe seleccionar el Beneficiario objetivo del RP"];
        self.alertas = true;
      }else if(self.cdp.NumeroDisponibilidad == null){
        swal("Alertas", "debe seleccionar el CDP objetivo del RP", "error");
        self.alerta_registro_rp = ["debe seleccionar el CDP objetivo del RP"];
      }else if (self.rubros_seleccionados.length == 0){
        swal("Alertas", "debe seleccionar el Rubro objetivo del RP", "error");
        self.alerta_registro_rp = ["debe seleccionar el Rubro objetivo del RP"];
      }else if($scope.compromiso.Objeto == null){
        swal("Alertas", "debe seleccionar el Compromiso del RP", "error");
        self.alerta_registro_rp = ["debe seleccionar el Compromiso del RP"];
      }else{

        var estado = {Id : 1};
        var rp = {
          UnidadEjecutora : self.cdp.UnidadEjecutora ,
          Vigencia : self.cdp.Vigencia,
          Responsable : self.cdp.Responsable.Id,
          Estado : estado,
          Beneficiario : self.proveedor.Id,
          Compromiso: $scope.compromiso
        };
        console.log(self.rp);
        for (var i = 0 ; i < self.rubros_seleccionados.length ; i++){
          self.rubros_seleccionados[i].ValorAsignado = parseFloat(self.rubros_seleccionados[i].ValorAsignado);
        }

        var registro = {
          rp : rp,
          rubros : self.rubros_seleccionados
        };
        console.log(registro);
        financieraMidRequest.post('registro_presupuestal', registro).then(function(response){
        self.alerta_registro_rp = response.data;
        angular.forEach(self.alerta_registro_rp, function(data){

          self.alerta = self.alerta + data + "\n";

        });
        swal("Alertas", self.alerta, self.alerta_registro_rp[0]);
        //alert(data);
        //self.limpiar();
        //console.log(registro);
        console.log(response.data);
        });


      }
    };

    self.gridOptions_compromiso.onRegisterApi = function(gridApi){
      self.gridApi = gridApi;
      gridApi.selection.on.rowSelectionChanged($scope,function(row){
        $scope.compromiso = row.entity;
        console.log($scope.compromiso);
      });
    };
      self.gridOptions_compromiso.multiSelect = false;
  });
