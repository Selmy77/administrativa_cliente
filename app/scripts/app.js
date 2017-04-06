'use strict';

/**
 * @ngdoc overview
 * @name financieraClienteApp
 * @description
 * # financieraClienteApp
 *
 * Main module of the application.
 */
angular
  .module('financieraClienteApp', [
    'ngAnimate',
  'ngCookies',
  'ngMessages',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'ngTouch',
  'afOAuth2',
  'treeControl',
  'ngMaterial',
  'ui.grid',
  'ui.grid.edit',
  'ui.grid.rowEdit',
  'ui.grid.cellNav',
  'ui.grid.treeView',
  'ui.grid.selection',
  'ui.grid.exporter',
  'ui.grid.autoResize',
  'ui.grid.pagination',
  'ui.grid.resizeColumns',
  'ngStorage',
  'financieraService',
  'ngStorage',
  'ngWebSocket',
  'angularMoment',
  'administrativaService',
  'ui.utils.masks',
  'pascalprecht.translate',
  'financieraMidService',
  'agoraService',
  'argoService',
  'agoraMidService',
  'ServiciosNecesidad',
  'uiGridService'
  ])

  .run(function(amMoment) {
    amMoment.changeLocale('es');
  })

  .config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix("");
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/conceptos/nuevo', {
        templateUrl: 'views/conceptos/crear_concepto.html',
        controller: 'CrearConceptoCtrl',
        controllerAs: 'crearConcepto'
      })
      .when('/notificaciones', {
        templateUrl: 'views/notificaciones.html',
        controller: 'NotificacionesCtrl',
        controllerAs: 'notificaciones'
      })
      .when('/iva', {
        templateUrl: 'views/iva/iva.html',
        controller: 'IvaCtrl',
        controllerAs: 'iva'
      })
      .when('/orden_pago/proveedor/crear', {
        templateUrl: 'views/orden_pago/op_crear.html',
        controller: 'OrdenPagoOpCrearCtrl',
        controllerAs: 'opCrear'
      })
      .when('/conceptos/concepto/:Id', {
        templateUrl: 'views/conceptos/concepto.html',
        controller: 'ConceptoCtrl',
        controllerAs: 'concepto'
      })
      .when('/compromisos/nuevo', {
        templateUrl: 'views/compromisos/crear_compromiso.html',
        controller: 'CrearCompromisoCtrl',
        controllerAs: 'crearCompromiso'
      })
      .when('/plan_cuentas/cuentas/nueva', {
        templateUrl: 'views/plan_cuentas/crear_cuentas.html',
        controller: 'PlanCuentasCrearCuentasCtrl',
        controllerAs: 'crearCuentas'
      })
      .when('/plan_cuentas/nuevo', {
        templateUrl: 'views/plan_cuentas/crear_plan.html',
        controller: 'PlanCuentasCrearPlanCtrl',
        controllerAs: 'crearPlan'
      })
      .when('/orden_pago/ver_todos', {
        templateUrl: 'views/orden_pago/op_view_all.html',
        controller: 'OrdenPagoOpViewAllCtrl',
        controllerAs: 'opViewAll'
      })
      .when('/rubro/rubro_registro', {
        templateUrl: 'views/rubro/rubroregistro.html',
        controller: 'RubroRubroRegistroCtrl',
        controllerAs: 'rubroRegistro'
      })
      .when('/rubro/rubro_consulta', {
        templateUrl: 'views/rubro/rubro_consulta.html',
        controller: 'RubroRubroConsultaCtrl',
        controllerAs: 'rubroConsulta'
      })
      .when('/rubro/rubro_apropiacion_planeacion', {
        templateUrl: 'views/rubro/rubro_apropiacion_planeacion.html',
        controller: 'RubroRubroApropiacionPlaneacionCtrl',
        controllerAs: 'rubroApropiacionPlaneacion'
      })
      .when('/rubro/rubro_apropiacion_consulta', {
        templateUrl: 'views/rubro/rubro_apropiacion_consulta.html',
        controller: 'RubroRubroApropiacionConsultaCtrl',
        controllerAs: 'rubroApropiacionConsulta'
      })
      .when('/rubro/rubro_apropiacion_aprobacion', {
        templateUrl: 'views/rubro/rubro_apropiacion_aprobacion.html',
        controller: 'RubroRubroApropiacionAprobacionCtrl',
        controllerAs: 'rubroApropiacionAprobacion'
      })
      .when('/rp/rp_registro', {
        templateUrl: 'views/rp/rp_registro.html',
        controller: 'RpRpRegistroCtrl',
        controllerAs: 'rpRegistro'
      })
      .when('/rp/rp_detalle', {
        templateUrl: 'views/rp/rp_detalle.html',
        controller: 'RpRpDetalleCtrl',
        controllerAs: 'rpDetalle'
      })
      .when('/rp/rp_consulta', {
        templateUrl: 'views/rp/rp_consulta.html',
        controller: 'RpRpConsultaCtrl',
        controllerAs: 'rpConsulta'
      })
      .when('/cdp/cdp_consulta', {
        templateUrl: 'views/cdp/cdp_consulta.html',
        controller: 'CdpCdpConsultaCtrl',
        controllerAs: 'cdpConsulta'
      })
      .when('/cdp/cdp_detalle', {
        templateUrl: 'views/cdp/cdp_detalle.html',
        controller: 'CdpCdpDetalleCtrl',
        controllerAs: 'cdpDetalle'
      })
      .when('/cdp/cdp_solicitud_consulta', {
        templateUrl: 'views/cdp/cdp_solicitud_consulta.html',
        controller: 'CdpCdpSolicitudConsultaCtrl',
        controllerAs: 'cdpSolicitudConsulta'
      })
      .when('/cdp/cdp_solicitud_detalle', {
        templateUrl: 'views/cdp/cdp_solicitud_detalle.html',
        controller: 'CdpCdpSolicitudDetalleCtrl',
        controllerAs: 'cdpSolicitudDetalle'
      })
      .when('/orden_pago/proveedor/:Id', {
        templateUrl: 'views/orden_pago/op_proveedor_ver_por_id.html',
        controller: 'OpProveedorVerPorIdCtrl',
        controllerAs: 'opProveedorVerPorId'
      })
      .when('/rp/rp_solicitud/:contrato/:vigencia/:valor/:documento/:nombre', {
        templateUrl: 'views/rp/rp_solicitud.html',
        controller: 'RpSolicitudCtrl',
        controllerAs: 'rpSolicitud'
      })
      .when('/rp/rp_solicitud_personas', {
        templateUrl: 'views/rp/rp_solicitud_personas.html',
        controller: 'RpRpSolicitudPersonasCtrl',
        controllerAs: 'rpSolicitudPersonas'
      })
      .otherwise({
        redirectTo: '/'
      });
  }]);
