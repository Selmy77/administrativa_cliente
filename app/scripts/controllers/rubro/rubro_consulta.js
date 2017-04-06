'use strict';

/**
 * @ngdoc function
 * @name financieraClienteApp.controller:RubroRubroConsultaCtrl
 * @description
 * # RubroRubroConsultaCtrl
 * Controller of the financieraClienteApp
 */
angular.module('financieraClienteApp')
  .controller('RubroRubroConsultaCtrl', function (financieraRequest) {
    var self = this;
    self.message = 'Consulta de rubros Vigencia';
    self.gridOptions = {
      enableFiltering : true,
      enableSorting : true,
      treeRowHeaderAlwaysVisible : false,
      showTreeExpandNoChildren: true,
      rowEditWaitInterval :-1,
      columnDefs : [
        {field: 'Id',             visible : false},
        {field: 'Entidad.Nombre',   displayName: 'Entidad'},
        {field: 'Vigencia',       cellClass:'alignleft'},
        {field: 'Codigo'},
        {field: 'Descripcion'},
        {field: 'TipoPlan'},
        {field: 'Administracion'},
        {field: 'Estado'}
      ]

    };
    financieraRequest.get('rubro','limit=0').then(function(response) {
      self.gridOptions.data = response.data;
    });
    self.actualiza_rubros = function () {
      financieraRequest.get('rubro','limit=0&query=vigencia%3A' + self.selectVigencia).then(function (response) {
        self.gridOptions.data = response.data;
        });
      };
  });
