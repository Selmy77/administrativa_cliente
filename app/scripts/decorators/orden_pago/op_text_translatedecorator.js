'use strict';

/**
 * @ngdoc function
 * @name financieraClienteApp.decorator:OrdenPagoOpTextTranslate
 * @description
 * # OrdenPagoOpTextTranslate
 * Decorator of the financieraClienteApp
 */
 var op_text_es = {
  OP_TITULO: "Ordenes de Pago",
 };

 var op_text_en = {
  OP_TITULO: "Payment Orders",
 };


angular.module('financieraClienteApp')
  .config(function ($translateProvider) {
    $translateProvider
      .translations("es", op_text_es)
      .translations("en", op_text_en);
    $translateProvider.preferredLanguage("es");
    $translateProvider.useSanitizeValueStrategy("sanitizeParameters");

  });
