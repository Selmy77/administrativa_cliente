'use strict';

/**
 * @ngdoc directive
 * @name financieraClienteApp.directive:ordenPago/opProveedorDetallePago
 * @description
 * # ordenPago/opProveedorDetallePago
 */
angular.module('financieraClienteApp')
  .directive('opProveedorDetallePago', function (financieraRequest) {
    return {
      restrict: 'E',
      scope:{
          tipoordenpago:'=?',
          iva: '=?',
          valorbase: '=?'
        },

      templateUrl: 'views/directives/orden_pago/op_proveedor_detalle_pago.html',
      controller:function($scope){
        var self = this;

        //tipo_documentos
        financieraRequest.get('tipo_orden_pago',
          $.param({limit:0})
        ).then(function(response) {
          self.tipo_orden_pago_data = response.data;
        });
        //iva
        financieraRequest.get('iva',
          $.param({
            query: "CategoriaIva.Nombre:Gravados",
            limit:0
          })
        ).then(function(response) {
          self.iva_data = response.data;
        });
        // valor bruto
        self.get_valor_bruto  = function (valor_base, iva){
          if(valor_base == null || valor_base == 0){
            self.ValorIva = 0;
            self.ValorBruto =0;
          }else if(iva == null || iva == 0) {
            self.ValorIva = 0;
            self.ValorBruto =0;
          }else{
            self.Iva = parseInt(iva.Valor);
            self.ValorIva = ( parseInt(valor_base) * ( parseInt(self.Iva)/100) );
            self.ValorBruto = parseInt(valor_base) + parseInt(self.ValorIva);
          }
        }


      },
      controllerAs:'d_opProveedorDetallePago'
    };
  });
