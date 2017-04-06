'use strict';

/**
 * @ngdoc function
 * @name financieraClienteApp.controller:RubroRubroApropiacionAprobacionCtrl
 * @description
 * # RubroRubroApropiacionAprobacionCtrl
 * Controller of the financieraClienteApp
 */
angular.module('financieraClienteApp')
  .controller('RubroRubroApropiacionAprobacionCtrl', function (financieraRequest,financieraMidRequest) {
    var self = this;
    self.message = 'Aprobación de presupuesto para una vigencia';
    self.alerta = "";
    self.gridOptions = {
      enableFiltering : false,
      enableSorting : false,
      treeRowHeaderAlwaysVisible : false,
      showTreeExpandNoChildren: false,
      enableRowSelection: true,
      enableSelectAll: true,
      selectionRowHeaderWidth: 35,
      rowHeight: 24,
      showGridFooter:true,
      columnDefs : [
        {field: 'Id',               visible : false},
        {field: 'Rubro.Codigo',     width: '18%',
         enableSorting : false,     cellClass:'alignleft',  displayName: 'Código'},
        {field: 'Vigencia',         width: '7%'},
        {field: 'Rubro.Descripcion',width: '40%',
        resizable : true,           displayName: 'Descripción'},
        {field: 'Estado.Nombre',    displayName: 'Estado',  width: '7%'},
        {field: 'Valor',            width: '15%',
         type:'number',             cellFilter: 'currency'}
      ],
      isRowSelectable : function(row){
        if(row.entity.Estado.Nombre == 'Aprobado'){
          return false;
        } else {
          return true;
        }
      },
      onRegisterApi : function( gridApi ) {
        self.gridApi = gridApi;
      }
    };

    self.aprobar_celdas_editadas = function(){
      //var aprobaciones = [];

      var apropiacion_a_aprobar = self.gridApi.selection.getSelectedRows();
      var aprob = angular.copy(apropiacion_a_aprobar);
      for (var i=0; i < apropiacion_a_aprobar.length; i++){
        delete aprob[i]["$$treeLevel"];
        console.log(aprob[i]);
      }
      //console.log(JSON.stringify(aprob));
      financieraMidRequest.post('aprobacion_apropiacion/Aprobar?tdominio=2', aprob).then(function(response) {
          //alert(response.data);
          self.alerta_aprobacion = response.data;
          angular.forEach(self.alerta_aprobacion, function(data){

            self.alerta = self.alerta + data + "\n";

          });
          swal("Alertas", self.alerta, self.alerta_aprobacion[0]);
          financieraRequest.get('apropiacion','limit=0&query=vigencia%3A2017').then(function(response) {
              self.gridOptions.data = response.data.sort(function(a,b){
                if(a.Rubro.Codigo < b.Rubro.Codigo) return -1;
                if(a.Rubro.Codigo > b.Rubro.Codigo) return 1;
                return 0;});
              var max_level = 0;
              var level = 0;
              for (var i=0; i < self.gridOptions.data.length; i++){
                level = (self.gridOptions.data[i].Rubro.Codigo.match(/-/g) || []).length;
                  if (level > max_level){
                    max_level = level;
                  };
              };

              for (var i=0; i < self.gridOptions.data.length; i++){
                level = (self.gridOptions.data[i].Rubro.Codigo.match(/-/g) || []).length;
                //console.log(level);
                if(level < max_level){
                    self.gridOptions.data[i].$$treeLevel = level;
                };
              };

            });
      });
    };

    financieraRequest.get('apropiacion','limit=0&query=vigencia%3A2017').then(function(response) {
      self.gridOptions.data = response.data.sort(function(a,b){
        if(a.Rubro.Codigo < b.Rubro.Codigo) return -1;
        if(a.Rubro.Codigo > b.Rubro.Codigo) return 1;
        return 0;});
      var max_level = 0;
      var level = 0;
      for (var i=0; i < self.gridOptions.data.length; i++){
        level = (self.gridOptions.data[i].Rubro.Codigo.match(/-/g) || []).length;
          if (level > max_level){
            max_level = level;
          };
      };

      for (var i=0; i < self.gridOptions.data.length; i++){
        level = (self.gridOptions.data[i].Rubro.Codigo.match(/-/g) || []).length;
        //console.log(level);
        if(level < max_level){
            self.gridOptions.data[i].$$treeLevel = level;
        };
      };

    });


  });
