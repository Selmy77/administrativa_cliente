'use strict';

/**
 * @ngdoc function
 * @name financieraClienteApp.controller:RpRpSolicitudPersonasCtrl
 * @description
 * # RpRpSolicitudPersonasCtrl
 * Controller of the financieraClienteApp
 */
angular.module('financieraClienteApp')
  .controller('RpRpSolicitudPersonasCtrl', function ($window,rp,$scope,financieraRequest, $routeParams,argoRequest,agoraMidRequest) {
    var self=this;
    //self.solicitudPersonas=solicitudPersonas;
    var query;
    var bandera=false;
    $scope.busquedaSinResultados=false;

    $scope.fields = {
        numcontrato: '',
        vigcontrato: '',
        contratistadocumento: '',
        valorcontrato: ''
    };

    self.gridOptions = {
	      enableFiltering : true,
	      enableSorting : true,
	      enableRowSelection: false,
        multiSelect: false,
	      enableSelectAll: false,
	      columnDefs : [
	        {field: 'Id',  displayName: 'Numero de Contrato'},
          {field: 'VigenciaContrato' ,  displayName: 'Vigencia de Contrato'},
          {field: 'Contratista.NomProveedor',  displayName: 'Contratista nombre'},
	        {field: 'Contratista.NumDocumento',  displayName: 'Contratista documento'},
	        {field: 'ValorContrato',  displayName: 'Valor del contrato', cellFilter: 'currency'},
	      ],
	      onRegisterApi : function( gridApi ) {
	        self.gridApi = gridApi;
	      }
    };

    self.buscarContratos = function(){
      $scope.busquedaSinResultados=false;
      query="";
      if($scope.fields.numcontrato!=''){
        if(bandera === false){
          bandera=true
          query=query+"Id:"+$scope.fields.numcontrato;
        }else{
          query=query+"Id:"+$scope.fields.numcontrato;
        }
      }

      if($scope.fields.vigcontrato!=''){
        if(bandera === false){
          bandera=true
          query=query+"VigenciaContrato:"+$scope.fields.vigcontrato;
        }else{
          query=query+",VigenciaContrato:"+$scope.fields.vigcontrato;
        }
      }


      if($scope.fields.contratistadocumento!=''){
        if(bandera === false){
          bandera=true
          query=query+"Contratista.NumDocumento:"+$scope.fields.contratistadocumento;
        }else{
          query=query+",Contratista.NumDocumento:"+$scope.fields.contratistadocumento;
        }
      }

      if($scope.fields.valorcontrato!=''){
        if(bandera === false){
          bandera=true
          query=query+"ValorContrato:"+$scope.fields.valorcontrato;
        }else{
          query=query+",ValorContrato:"+$scope.fields.valorcontrato;
        }
      }

      //Post enviando string al mid api agora

      var datos = JSON.stringify(query);

      agoraMidRequest.post('informacion_proveedor/contratoPersona',datos).then(function(response) {
          self.gridOptions.data = response.data;
          if(response.data === null){
          $scope.busquedaSinResultados=true;
        }
      });
      bandera=false;

    };

    self.mostrar_estadisticas = function(){
      var seleccion = self.gridApi.selection.getSelectedRows();
        var contrato={
          Id : seleccion[0].Id,
          Vigencia : seleccion[0].VigenciaContrato,
          ContratistaId : seleccion[0].Contratista.NumDocumento,
          ValorContrato : seleccion[0].ValorContrato,
          NombreContratista : seleccion[0].Contratista.NomProveedor,
        };

      self.saving =true;
      self.btnGenerartxt = "Generando...";

        self.saving =false;
        self.btnGenerartxt="Generar";
        $window.location.href = '#/rp/rp_solicitud/'+contrato.Id+"/"+contrato.Vigencia+"/"+contrato.ValorContrato+"/"+contrato.ContratistaId+"/"+contrato.NombreContratista;

    };

  });
