'use strict';

/**
 * @ngdoc service
 * @name financieraClienteApp.uiGridService
 * @description
 * # uiGridService
 * Service in the financieraClienteApp.
 */
 angular.module('uiGridService', [])
   .factory('uiGridService', function($http, $rootScope) {
     var factory = {};

     factory.getGridHeight = function(gridOptions) {

       var length = gridOptions.data.length;
       var rowHeight = 30; // your row height
       var headerHeight = 40; // your header height
       var filterHeight = 40; // your filter height

       return{
         height: length * rowHeight + headerHeight + filterHeight + "px"
     };
     }
     factory.removeUnit = function(value, unit) {

       return value.replace(unit, '');
     }
     return factory;
   });
