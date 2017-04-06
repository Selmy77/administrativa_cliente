'use strict';

/**
 * @ngdoc function
 * @name financieraClienteApp.controller:RubroRubroregistroCtrl
 * @description
 * # RubroRubroregistroCtrl
 * Controller of the financieraClienteApp
 */
angular.module('financieraClienteApp')
  .controller('RubroRubroRegistroCtrl', function (financieraRequest) {
    var self = this;

    self.message = 'Registro de rubros';

    self.codigo_padre = 'Sin Rubro Padre';
    self.gridOptions = {
      paginationPageSizes: [10, 100, 250, 500],
      paginationPageSize: 250,
      enableColumnResizing: true,
      enableFiltering : true,
      enableFiltering : false,
      enableSorting : true,
      treeRowHeaderAlwaysVisible : false,
      showTreeExpandNoChildren: false,

      columnDefs : [
        {field: 'Id',             visible : false},
        {field: 'Entidad.Nombre',  displayName: 'Entidad' },
        {field: 'Vigencia',  cellClass:'alignleft'},
        {field: 'Codigo',  cellTemplate: '<div ng-click="grid.appScope.rubroRegistro.agregar_padre(row)"> {{row.entity.Codigo}} </div>',
          cellClass: function(grid, row, col, rowRenderIndex, colRenderIndex) {
            if (grid.getCellValue(row ,col).toLowerCase() === self.ultimo_registro) {
            return 'color_green';
            }
          }
        },
        {field: 'Descripcion'},
        {field: 'TipoPlan'},
        {field: 'Administracion'},
        {field: 'Estado'}
      ]

    };

        var year = new Date().getFullYear();
        var dif = year - 1995 ;
        var range = [];
        range.push(year);
        for(var i=1;i<dif;i++) {
          range.push(year - i);
        }
        self.years = range;



    financieraRequest.get('entidad','limit=0').then(function (response) {
      self.entidadOptions = response.data;
      });


    self.quitar_padre = function() {
      self.codigo_padre = 'Sin Rubro Padre'
      self.tipo_plan_hijo = ''
    };

    self.actualiza_rubros = function () {
      console.log(self.selectVigencia);
     if (self.selectVigencia != null){
       financieraRequest.get('rubro','limit=0&sortby=Codigo&order=desc&query=vigencia%3A' + self.selectVigencia).then(function(response) {

         if (response.data != null && typeof(response.data) != "string"){
           console.log(response.data);
           self.gridOptions.data = response.data.sort(function(a,b){
             if(a.Codigo < b.Codigo) return -1;
             if(a.Codigo > b.Codigo) return 1;
             return 0;});
           var max_level = 0;
           var level = 0;
           for (var i=0; i < self.gridOptions.data.length; i++){
             level = (self.gridOptions.data[i].Codigo.match(/-/g) || []).length;
               if (level > max_level){
                 max_level = level;
               };
           };

           for (var i=0; i < self.gridOptions.data.length; i++){
             level = (self.gridOptions.data[i].Codigo.match(/-/g) || []).length;
             //console.log(level);
             if(level < max_level){
                 self.gridOptions.data[i].$$treeLevel = level;
             };
           };
         }else{
           self.gridOptions.data = [];
         }

       });
     }


      };
      self.agregar_padre = function(cell) {
            self.codigo_padre =cell.entity.Codigo;
            self.id_padre = cell.entity.Id;
            self.tipo_plan_hijo = cell.entity.TipoPlan
        };


      self.registrar_rubro = function() {
        var codigo_rubro = "";
        var id_hijo = 0;
        var rubro_padre;


        if( self.codigo_padre == 'Sin Rubro Padre'){
          codigo_rubro = codigo_rubro + self.codigo_hijo;
        }else{
          codigo_rubro = codigo_rubro + self.codigo_padre + "-" + self.codigo_hijo;

            rubro_padre= {
                  Id : parseInt(self.id_padre)
              };

        }
        var entidad = {
              Id: parseInt(self.selectEntidad)
          };
        var rubro_hijo = {
              Vigencia: parseInt(self.selectVigencia),
              Entidad: entidad,
              Codigo: codigo_rubro,
              Descripcion: self.descripcion_hijo,
              TipoPlan: parseInt(self.tipo_plan_hijo),
              Estado: 1
          };
          console.log(rubro_hijo);
         if(rubro_padre != null){
            var rubro_rubro = {
                  RubroPadre : rubro_padre,
                  RubroHijo: rubro_hijo
                }

            financieraRequest.post('rubro_rubro', rubro_rubro).then(function(response) {
                   var id_rubro_rubro = response.data;
                   console.log(id_rubro_rubro);
                   if(typeof(id_rubro_rubro)=="number"){
                    if(id_rubro_rubro > 0){
                      self.ultimo_registro = rubro_hijo.Codigo;
                      swal("Alertas", "Relacion Rubro Padre - Hijo Registrada", "success");
                      //alert("Relacion Rubro Padre - Hijo Registrada");
                    }else{
                      swal("Alertas", "Transaccion no realizada debido a un error", "error");
                      //alert("Transaccion no realizada debido a un error");
                    }

                     self.actualiza_rubros();
                     console.log(id_rubro_rubro);
                   }
                   if(typeof(id_rubro_rubro)=="object"){
                      alert(data.Detail);
                   }
                 });;

         }else{
            financieraRequest.post("rubro", rubro_hijo).then(function(response) {
            id_hijo = response.data;
            if(typeof(id_hijo)=="number"){
              if(id_hijo > 0){
                self.ultimo_registro = rubro_hijo.Codigo;
                swal("Alertas", "Rubro Registrado", "success");
                //alert("Rubro Registrado");
              }else{
                swal("Alertas", "Transaccion no realizada debido a un error", "error");
              }

              self.actualiza_rubros();
            }
            if(typeof(id_hijo)=="object"){
              alert(data.Detail);
            }
            console.log(data);
            });;
         }


        };
  });
