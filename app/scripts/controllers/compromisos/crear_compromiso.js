'use strict';

/**
 * @ngdoc function
 * @name financieraClienteApp.controller:CompromisosCrearCompromisoCtrl
 * @description
 * # CompromisosCrearCompromisoCtrl
 * Controller of the financieraClienteApp
 */
angular.module('financieraClienteApp')
  .controller('CrearCompromisoCtrl', function (financieraRequest) {
    var self = this;
    self.test="test....";

    self.nueva_categoria={};
    self.nuevo_compromiso={};
    self.nuevo_tipo={
      EstadoActivo:false
    };

    self.categorias=[];
    self.tipos=[];
    self.unidades_ejecutoras=[];
    self.estados_compromiso=[];

    self.cargar_categorias=function(){
      financieraRequest.get("categoria_compromiso",$.param({
        sortby: "Id",
        order: "asc",
        limit:0
      })).then(function(response){
        console.log(response.data);
        self.categorias=response.data;
        console.log(self.categorias);
      });
    };

    self.cargar_tipos=function(){
      financieraRequest.get("tipo_compromiso_tesoral",$.param({
        sortby: "Id",
        order: "asc",
        limit:0
      })).then(function(response){
        self.tipos=response.data;
      });
    };

    self.cargar_unidades_ejecutoras=function(){
      financieraRequest.get("unidad_ejecutora",$.param({
        sortby: "Id",
        order: "asc",
        limit:0
      })).then(function(response){
        self.unidades_ejecutoras=response.data;
      });
    };

    self.cargar_estados_compromisos=function(){
      financieraRequest.get("estado_compromiso",$.param({
        sortby: "Id",
        order: "asc",
        limit:0
      })).then(function(response){
        self.estados_compromiso=response.data;
      });
    };



    self.crear_categoria=function(){
      financieraRequest.post('categoria_compromiso',self.nueva_categoria).then(function(response){
        console.log("categoria agregada",response.data);
        self.nueva_categoria={};
        self.cargar_categorias();
      });//.then(function(){});
      //self.categorias.push(self.nueva_categoria);

    };

    self.crear_tipo=function(){
      //financieraRequest.post('categoria_compromiso',self.nueva_categoria);//.then(function(){});
      financieraRequest.post('tipo_compromiso_tesoral',self.nuevo_tipo).then(function(response){
        console.log("tipo agregado",response.data);
        self.nuevo_tipo={
          EstadoActivo:false
        };
        self.cargar_tipos();
      });
      //self.tipos.push(self.nuevo_tipo);
    };

    self.crear_compromiso=function(){
      self.nuevo_compromiso.FechaModificacion= new Date();
      financieraRequest.post('compromiso',self.nuevo_compromiso).then(function(response){
        console.log("compromiso agregado",response.data);
        self.nuevo_compromiso={};
      });
    };

    self.cancelar=function(form){
      form.$setPristine();
      form.$setUntouched();
    };

    self.cargar_categorias();
    self.cargar_tipos();
    self.cargar_unidades_ejecutoras();
    self.cargar_estados_compromisos();



  });
