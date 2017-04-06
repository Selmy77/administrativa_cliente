'use strict';

/**
 * @ngdoc function
 * @name financieraClienteApp.controller:ConceptosConceptoCtrl
 * @description
 * # ConceptosConceptoCtrl
 * Controller of the financieraClienteApp
 */
angular.module('financieraClienteApp')
  .controller('ConceptoCtrl', function ($routeParams, financieraRequest) {
    var self = this;
    self.conceptoId=$routeParams.Id;
    financieraRequest.get('concepto',$.param({
      query: "Codigo:"+$routeParams.Id
    })).then(function(response){
      self.v_concepto=response.data[0];

      financieraRequest.get('afectacion_concepto',$.param({
        query: "Concepto:"+self.v_concepto.Id
      })).then(function(response){
        self.afectaciones=response.data;
      });

    });

  });
