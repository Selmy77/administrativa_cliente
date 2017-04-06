'use strict';

/**
 * @ngdoc service
 * @name financieraClienteApp.agoraService
 * @description
 * # agoraService
 * Service in the financieraClienteApp.
 */
 angular.module('argoService',[])
   .factory('argoRequest', function ($http) {
     // Service logic
     // ...
     var path = "http://localhost:8082/v1/";
     // Public API here
     return {
       get: function (tabla,params) {
         return $http.get(path+tabla+"/?"+params);
       },
       post: function (tabla,elemento) {
         return $http.post(path+tabla,elemento);
       },
       put: function (tabla,id,elemento) {
         return $http.put(path+tabla+"/"+id,elemento);
       },
       delete: function (tabla,id) {
         return $http.delete(path+tabla+"/"+id);
       }
     };
   });
