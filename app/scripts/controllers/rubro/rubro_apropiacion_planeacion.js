'use strict';

/**
 * @ngdoc function
 * @name financieraClienteApp.controller:RubroRubroApropiacionPlaneacionCtrl
 * @description
 * # RubroRubroApropiacionPlaneacionCtrl
 * Controller of the financieraClienteApp
 */
angular.module('financieraClienteApp')
  .controller('RubroRubroApropiacionPlaneacionCtrl', function (financieraRequest){
    var self = this;
    self.message = 'Planeación de presupuesto para una vigencia';
    // self.celdas_editadas = gridApi.rowEdit.getDirtyRows();
    self.gridOptions_ingresos = {
      enableFiltering : false,
      enableSorting : false,
      treeRowHeaderAlwaysVisible : false,
      showTreeExpandNoChildren: false,
      rowEditWaitInterval :-1,
      showGridFooter:true,
      columnDefs : [
        {field: 'Id',               enableCellEdit: false,  visible : false},
        {field: 'Rubro.Codigo',     enableCellEdit: false,  width: '18%',
         enableSorting : false,     cellClass:'alignleft',  displayName: 'Código'},
        {field: 'Vigencia',         enableCellEdit: false,  width: '7%'},
        {field: 'Rubro.Descripcion',enableCellEdit: false,  width: '44%',
        resizable : true,           displayName: 'Descripción'},
        {field: 'Estado.Nombre',    displayName: 'Estado',  enableCellEdit: false,  width: '7%'},
        {field: 'Valor',            enableCellEdit: true,   width: '15%',
         type:'number',             cellFilter: 'currency',
         cellEditableCondition: function(self){
           if(self.row.entity.Estado.Nombre == 'Aprobado'){
             return false;
           } else {
             return true;
           }
         }
        }
      ]
    };

    self.gridOptions_gastos = {
      enableFiltering : false,
      enableSorting : false,
      treeRowHeaderAlwaysVisible : false,
      showTreeExpandNoChildren: false,
      rowEditWaitInterval :-1,
      showGridFooter:true,
      columnDefs : [
        {field: 'Id',               enableCellEdit: false,  visible : false},
        {field: 'Rubro.Codigo',     enableCellEdit: false,  width: '18%',
         enableSorting : false,     cellClass:'alignleft',  displayName: 'Código'},
        {field: 'Vigencia',         enableCellEdit: false,  width: '7%'},
        {field: 'Rubro.Descripcion',enableCellEdit: false,  width: '44%',
        resizable : true,           displayName: 'Descripción'},
        {field: 'Estado.Nombre',    displayName: 'Estado',  enableCellEdit: false,  width: '7%'},
        {field: 'Valor',            enableCellEdit: true,   width: '15%',
         type:'number',             cellFilter: 'currency',
         cellEditableCondition: function(self){
           if(self.row.entity.Estado.Nombre == 'Aprobado'){
             return false;
           } else {
             return true;
           }
         }
       }
      ]
    };


    self.gridOptions_ingresos.onRegisterApi = function(gridApi) {
    //set gridApi on scope
      self.gridApi_ingresos = gridApi;
      gridApi.edit.on.afterCellEdit(self, function(rowEntity, colDef, newValue, oldValue) {
        self.verificar_sumas(gridApi.grid.rows.reverse());
        gridApi.grid.rows.reverse();
        // console.log('self.valor_sumas');
        // console.log(self.valor_sumas);
        // console.log('self.stack_sumas');
        // console.log(self.stack_sumas);

        colDef.cellClass = function(grid, row, col, rowRenderIndex, colRenderIndex) {

          if(self.valor_sumas.hasOwnProperty(row.entity.Rubro.Codigo)){
            if (self.valor_sumas[row.entity.Rubro.Codigo] !== row.entity.Valor) {
              return "color_red";
            };
          };
          return "";
        };

        self.gridApi_ingresos.core.notifyDataChange(uiGridConstants.dataChange.COLUMN);
      });
    };

    self.gridOptions_gastos.onRegisterApi = function(gridApi) {
    //set gridApi on scope
      self.gridApi_gastos = gridApi;
      gridApi.edit.on.afterCellEdit(self, function(rowEntity, colDef, newValue, oldValue) {
        self.verificar_sumas(gridApi.grid.rows.reverse());
        gridApi.grid.rows.reverse();
        // console.log('self.valor_sumas');
        // console.log(self.valor_sumas);
        // console.log('self.stack_sumas');
        // console.log(self.stack_sumas);

        colDef.cellClass = function(grid, row, col, rowRenderIndex, colRenderIndex) {

          if(self.valor_sumas.hasOwnProperty(row.entity.Rubro.Codigo)){
            if (self.valor_sumas[row.entity.Rubro.Codigo] !== row.entity.Valor) {
              return "color_red";
            };
          };
          return "";
        };

        self.gridApi_gastos.core.notifyDataChange(uiGridConstants.dataChange.COLUMN);
      });
    };

    self.verificar_sumas = function(filas){
      // console.log(filas);
      self.stack_sumas = [];
      self.valor_sumas = {};
      var campo_valor = "";
      for(var i=0; i<filas.length; i++){
        campo_valor = (filas[i].entity.Rubro.Codigo).split(/[-]*[0-9]+$/)[0];
        if(self.stack_sumas.length !== 0){
          if(campo_valor === self.stack_sumas[self.stack_sumas.length-1].campo){
            self.stack_sumas[self.stack_sumas.length-1].valor =
              self.stack_sumas[self.stack_sumas.length-1].valor + Number(filas[i].entity.Valor);
              // console.log(filas[i].entity);
          }else if(filas[i].entity.Rubro.Codigo === self.stack_sumas[self.stack_sumas.length-1].campo){
            self.valor_sumas[filas[i].entity.Rubro.Codigo] = (self.stack_sumas.pop()).valor;

            if(self.stack_sumas.length > 0 && self.stack_sumas[self.stack_sumas.length-1].campo === campo_valor){
              self.stack_sumas[self.stack_sumas.length-1].valor =
                self.stack_sumas[self.stack_sumas.length-1].valor + self.valor_sumas[filas[i].entity.Rubro.Codigo];
            }else{
              self.stack_sumas.push({
                campo:  campo_valor,
                valor:  self.valor_sumas[filas[i].entity.Rubro.Codigo]
              });
            }
            // console.log('copio'+self.stack_sumas[self.stack_sumas.length-1]);
          }else{
            self.stack_sumas.push({
              campo:  campo_valor,
              valor:  Number(filas[i].entity.Valor)
            });
          }
        }else{
          self.stack_sumas.push({
            campo:  campo_valor,
            valor:  Number(filas[i].entity.Valor)
          });
        };

      }

    };

    self.guardar_celdas_editadas = function(gridApi){
      var filas_por_guardar = gridApi.rowEdit.getDirtyRows();
      for (var i = 0; i < filas_por_guardar.length; i++) {
        financieraRequest.put('apropiacion',filas_por_guardar[i].entity.Id,filas_por_guardar[i].entity);
      }
      var dataRows = filas_por_guardar.map( function( gridRow ) { return gridRow.entity; });
      gridApi.rowEdit.setRowsClean(dataRows);
    };

    financieraRequest.get('apropiacion','limit=0&query=vigencia%3A2017').then(function(response) {
      self.gridOptions_ingresos.data = response.data.sort(function(a,b){
        if(a.Rubro.Codigo < b.Rubro.Codigo) return -1;
        if(a.Rubro.Codigo > b.Rubro.Codigo) return 1;
        return 0;});
      var max_level = 0;
      var level = 0;
      for (var i=0; i < self.gridOptions_ingresos.data.length; i++){
        level = (self.gridOptions_ingresos.data[i].Rubro.Codigo.match(/-/g) || []).length;
          if (level > max_level){
            max_level = level;
          };
      };

      for (var i=0; i < self.gridOptions_ingresos.data.length; i++){
        level = (self.gridOptions_ingresos.data[i].Rubro.Codigo.match(/-/g) || []).length;
        //console.log(level);
        if(level < max_level){
            self.gridOptions_ingresos.data[i].$$treeLevel = level;
        };
      };

    });

    financieraRequest.get('apropiacion','limit=0&query=vigencia%3A2017').then(function(response) {
      self.gridOptions_gastos.data = response.data.sort(function(a,b){
        if(a.Rubro.Codigo < b.Rubro.Codigo) return -1;
        if(a.Rubro.Codigo > b.Rubro.Codigo) return 1;
        return 0;});
      var max_level = 0;
      var level = 0;
      for (var i=0; i < self.gridOptions_gastos.data.length; i++){
        level = (self.gridOptions_gastos.data[i].Rubro.Codigo.match(/-/g) || []).length;
          if (level > max_level){
            max_level = level;
          };
      };

      for (var i=0; i < self.gridOptions_gastos.data.length; i++){
        level = (self.gridOptions_gastos.data[i].Rubro.Codigo.match(/-/g) || []).length;
        //console.log(level);
        if(level < max_level){
            self.gridOptions_gastos.data[i].$$treeLevel = level;
        };
      };

    });



  });
