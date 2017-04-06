'use strict';

/**
 * @ngdoc directive
 * @name financieraClienteApp.directive:cdp/listaCdp
 * @description
 * # cdp/listaCdp
 */
 angular.module('financieraClienteApp')
   .directive('listaCdp', function (financieraRequest,financieraMidRequest,agoraRequest) {
     return {
       restrict: 'E',
      scope : {
           cdp :'=' ,
           rubros : '='
         },
       templateUrl: 'views/directives/cdp/lista_cdp.html',
       controller:function($scope){
         var self = this;
         self.gridOptions_cdp = {
           enableRowSelection: true,
       enableRowHeaderSelection: false,
       enableFiltering: true,
       multiSelect: false,
       columnDefs : [
         {field: 'Id',             visible : false},
         {field: 'NumeroDisponibilidad',   displayName: 'Consecutivo'},
         {field: 'Vigencia',       cellClass:'alignleft'},
         {field: 'FechaRegistro' , displayName : 'Fecha de Registro' , cellTemplate: '<span>{{row.entity.FechaRegistro | date:"yyyy-MM-dd":"+0900"}}</span>'},
         {field: 'Solicitud.SolicitudDisponibilidad.Necesidad.Objeto',   displayName: 'Objeto'},
         {field: 'Solicitud.DependenciaSolicitante.OrdenadorGasto.Id',   displayName: 'Ordenador'},
         {field: 'Estado.Nombre', displayName : 'Estado'},
         {field: 'Solicitud.Necesidad.DependenciaSolicitante.Nombre' , displayName : 'Dependencia Solicitante'}
       ]

     };

     financieraRequest.get('disponibilidad','limit=0').then(function(response) {
       self.gridOptions_cdp.data = response.data;
       angular.forEach(self.gridOptions_cdp.data, function(data){
         financieraMidRequest.get('disponibilidad/SolicitudById/'+data.Solicitud,'').then(function(response) {
             data.Solicitud = response.data[0];
             console.log(data);
             });

           });
     });

     self.gridOptions_cdp.onRegisterApi = function(gridApi){
       //set gridApi on scope
       self.gridApi = gridApi;
       gridApi.selection.on.rowSelectionChanged($scope,function(row){
         $scope.cdp = row.entity;
         agoraRequest.get('necesidad','limit=1&query=Id:'+$scope.cdp.Solicitud.Id).then(function(response) {
           $scope.cdp.Necesidad = response.data;
         });
         financieraRequest.get('disponibilidad_apropiacion','limit=0&query=Disponibilidad.Id:'+$scope.cdp.Id).then(function(response) {
           $scope.rubros = response.data;
           angular.forEach($scope.rubros, function(data){
               var saldo;
               var rp = {
                 Disponibilidad : data.Disponibilidad, // se construye rp auxiliar para obtener el saldo del CDP para la apropiacion seleccionada
                 Apropiacion : data.Apropiacion
               };
               financieraRequest.post('disponibilidad/SaldoCdp',rp).then(function(response){
                 data.Saldo  = response.data;
               });

             });
         });





       });
     };
       },
       controllerAs:'d_listaCdp'
     };
   });
