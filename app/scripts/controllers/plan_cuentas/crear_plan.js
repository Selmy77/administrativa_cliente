'use strict';

/**
 * @ngdoc function
 * @name financieraClienteApp.controller:PlanCuentasCrearPlanCtrl
 * @description
 * # PlanCuentasCrearPlanCtrl
 * Controller of the financieraClienteApp
 */
angular.module('financieraClienteApp')
  .controller('PlanCuentasCrearPlanCtrl', function (financieraRequest) {
  var self=this;
  self.nuevo_plan={};
  self.actualizar=false;

  financieraRequest.get("unidad_ejecutora",$.param({
    sortby: "Id",
    order: "asc",
    limit:0
  })).then(function(response){
    self.unidades_ejecutoras=response.data;
  });

  self.crear_plan=function(){
    financieraRequest.post("plan_cuentas", self.nuevo_plan).then(function(response){
      alert("plan de cuentas creado:"+ response.data.Nombre);
      self.nuevo_plan={};
      self.actualizar=!self.actualizar;
    });
  };

  });
