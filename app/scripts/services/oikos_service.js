'use strict';

/**
 * @ngdoc service
 * @name contractualClienteApp.oikosService
 * @description
 * # oikosService
 * Factory in the contractualClienteApp.
 */
angular.module('oikosService',[])
  .factory('oikosRequest', function($http) {
    // Service logic
    // ...
    var path = "http://10.20.0.254/oikos_amazon_api/v1/";
    //var path = "http://10.20.2.121:8090/v1/";
    // Public API here
    return {
      get: function(tabla, params) {
        return $http.get(path + tabla + "/?" + params);
      },
      post: function(tabla, elemento) {
        return $http.post(path + tabla, elemento);
      },
      put: function(tabla, id, elemento) {
        return $http.put(path + tabla + "/" + id, elemento);
      },
      delete: function(tabla, id) {
        return $http.delete(path + tabla + "/" + id);
      }
    };
  });
