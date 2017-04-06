'use strict';

/**
 * @ngdoc function
 * @name financieraClienteApp.controller:RubroRubroApropiacionConsultaCtrl
 * @description
 * # RubroRubroApropiacionConsultaCtrl
 * Controller of the financieraClienteApp
 */
angular.module('financieraClienteApp')
  .controller('RubroRubroApropiacionConsultaCtrl', function (financieraRequest){
    var self = this;
    self.message = 'Apropiacion de la vigencia';
    self.gridOptions = {
      enableFiltering : false,
      enableSorting : true,
      treeRowHeaderAlwaysVisible : false,
      showTreeExpandNoChildren: true,
      rowEditWaitInterval :-1,
      columnDefs : [
        {field: 'Id',               visible : false},
        {field: 'Rubro.Codigo',     width: '18%', enableSorting : false,     cellClass:'alignleft',  displayName: 'Código'},
        {field: 'Vigencia',         width: '7%'},
        {field: 'Rubro.Descripcion',width: '44%', resizable : true,           displayName: 'Descripción'},
        {field: 'Estado.Nombre',    width: '16%',  displayName: 'Estado',  enableCellEdit: false},
        {field: 'Valor',            width: '15%', cellFilter: 'currency'},
        {field: 'Saldo',            width: '15%', cellFilter: 'currency'}
      ],
      onRegisterApi: function(gridApi){ self.gridApi = gridApi;}

    };

    self.cargarSaldos = function(){
      angular.forEach(self.gridOptions.data, function(data){
        financieraRequest.get('apropiacion/SaldoApropiacion/'+data.Id,'').then(function(response) {

          //console.log(response.data);
          data.Saldo = response.data;
        });
        });
      }



    financieraRequest.get('apropiacion','limit=0').then(function(response) {
      self.gridOptions.data = response.data;
      self.cargarSaldos();
    })

    //self.gridApi.core.refresh();
    self.actualiza_rubros = function () {
      financieraRequest.get('apropiacion','limit=0&query=vigencia%3A' + self.selectVigencia).then(function(response) {
        self.gridOptions.data = response.data;
      });
      };

  });
