'use strict';

/**
 * @ngdoc function
 * @name financieraClienteApp.controller:PlanCuentasCrearCuentasCtrl
 * @description
 * # PlanCuentasCrearCuentasCtrl
 * Controller of the financieraClienteApp
 */
angular.module('financieraClienteApp')
  .controller('PlanCuentasCrearCuentasCtrl', function(financieraRequest,$scope) {
    var self = this;
    self.prueba = "affs";
    self.cuentas = [];
    self.naturalezas = ["debito", "credito"];
    self.nueva_cuenta = {};
    self.cuenta_estructura = {};
    self.niveles=[];
    self.padre={};



    self.crear_cuenta = function() {
      //self.nueva_cuenta.subcuentas = [];
      financieraRequest.post("cuenta_contable", self.nueva_cuenta).then(function(response){
        console.log(response.data);
      });
      self.nueva_cuenta = {};
    };

    $scope.$watch('crearCuentas.padre',function(){

      if (self.padre.NivelClasificacion == undefined) {
        financieraRequest.get('nivel_clasificacion/primer_nivel',"").then(function(response){
          self.nivel=response.data;
          self.nueva_cuenta.NivelClasificacion=response.data;
        });
      }else {
        financieraRequest.get('estructura_niveles_clasificacion',$.param({
          query:"NivelPadre:"+self.padre.NivelClasificacion.Id
        })).then(function(response){
          self.nivel=response.data[0].NivelHijo;
          self.nueva_cuenta.NivelClasificacion=self.nivel;
        });
      }

    },true);



  });
