'use strict';

/**
 * @ngdoc directive
 * @name financieraClienteApp.directive:movimientosContables
 * @description directiva para la gestión de movimientos contables
 * #movimientosContables
 */

angular.module('financieraClienteApp')
  .directive('movimientosContables', function(financieraRequest, uiGridConstants) {
    return {
      restrict: 'E',
      scope: {
        conceptoid: '=?',
        movimientos: '=?',
        editable: '@?',
        monto: '=?',
        validatemov: '=?'
      },
      templateUrl: 'views/directives/cuentas_contables/movimientos_contables.html',
      link: function(scope, element, attrs) {
        scope.showmovs = 'conceptoid' in attrs;
        if ('editable' in attrs) {
          attrs['editable'] = true;
        } else {
          attrs['editable'] = false;
        }
        console.log(attrs);
      },
      controller: function($scope) {
        var self = this;

        self.gridOptionsMovimientos= {
          showColumnFooter: true,
          enableCellEditOnFocus: true,
          enableHorizontalScrollbar: 0,
          enableVerticalScrollbar: 0,
          enableRowHeaderSelection: false,
          enableFiltering: false,
          enableSorting: true,
          treeRowHeaderAlwaysVisible: false,
          showTreeExpandNoChildren: true,
          rowEditWaitInterval: -1,
          columnDefs: [{
              field: 'CuentaContable.Codigo',
              displayName: 'Codigo Cuenta',
              cellClass: 'text-success',
              headerCellClass: 'text-info',
              cellTooltip: function(row, col) {
                return row.entity.CuentaContable.NivelClasificacion.Nombre;
              },
              enableCellEdit: false,
              width: '20%'
            },
            {
              field: 'CuentaContable.Nombre',
              displayName: 'Nombre Cuenta',
              cellClass: 'text-success',
              headerCellClass: 'text-info',
              cellTooltip: function(row, col) {
                return row.entity.CuentaContable.Nombre + ": \n" + row.entity.CuentaContable.Descripcion;
              },
              enableCellEdit: false,
              width: '25%'
            },
            {
              field: 'Debito',
              headerCellClass: 'text-info',
              cellTemplate: '<div ng-init="row.entity.Debito=0">{{row.entity.Debito}}</div>',
              width: '20%',
              enableCellEdit: true,
              cellEditableCondition: function() {
                return $scope.editable
              },
              type: 'number',
              aggregationType: uiGridConstants.aggregationTypes.sum
            },
            {
              field: 'Credito',
              width: '20%',
              headerCellClass: 'text-info',
              type: 'number',
              enableCellEdit: true,
              cellEditableCondition: function() {
                return $scope.editable
              },
              cellTemplate: '<div ng-init="row.entity.Credito=0">{{row.entity.Credito}}</div>',
              aggregationType: uiGridConstants.aggregationTypes.sum
            },
            {
              field: 'CuentaContable.Naturaleza',
              displayName: 'Naturaleza',
              headerCellClass: 'text-info',
              enableCellEdit: false,
              width: '15%'
            }
          ]
        };

        self.gridOptionsMovsAcreedores = {
          showColumnFooter: true,
          enableCellEditOnFocus: true,
          enableHorizontalScrollbar: 0,
          enableVerticalScrollbar: 0,
          enableRowHeaderSelection: false,
          enableFiltering: false,
          enableSorting: true,
          treeRowHeaderAlwaysVisible: false,
          showTreeExpandNoChildren: true,
          rowEditWaitInterval: -1,
          headerTemplate: '<div class="ui-grid-top-panel ui-grid-cell-contents ui-grid-header-cell-primary-focus text-info" style="text-align: center">Cuentas Acreedoras</div>',
          columnDefs: [{
              field: 'CuentaContable.Codigo',
              displayName: 'Codigo Cuenta',
              cellClass: 'text-success',
              headerCellClass: 'text-info',
              cellTooltip: function(row, col) {
                return row.entity.CuentaContable.NivelClasificacion.Nombre;
              },
              enableCellEdit: false,
              width: '20%'
            },
            {
              field: 'CuentaContable.Nombre',
              displayName: 'Nombre Cuenta',
              cellClass: 'text-success',
              headerCellClass: 'text-info',
              cellTooltip: function(row, col) {
                return row.entity.CuentaContable.Nombre + ": \n" + row.entity.CuentaContable.Descripcion;
              },
              enableCellEdit: false,
              width: '25%'
            },
            {
              field: 'Debito',
              headerCellClass: 'text-info',
              cellTemplate: '<div ng-init="row.entity.Debito=0">{{row.entity.Debito}}</div>',
              width: '20%',
              enableCellEdit: true,
              cellEditableCondition: function() {
                return $scope.editable
              },
              type: 'number',
              aggregationType: uiGridConstants.aggregationTypes.sum
            },
            {
              field: 'Credito',
              width: '20%',
              headerCellClass: 'text-info',
              type: 'number',
              enableCellEdit: true,
              cellEditableCondition: function() {
                return $scope.editable
              },
              cellTemplate: '<div ng-init="row.entity.Credito=0">{{row.entity.Credito}}</div>',
              aggregationType: uiGridConstants.aggregationTypes.sum
            },
            {
              field: 'CuentaContable.Naturaleza',
              displayName: 'Naturaleza',
              headerCellClass: 'text-info',
              enableCellEdit: false,
              width: '15%'
            }
          ]
        };

        $scope.gridHeight = self.gridOptionsMovimientos.rowHeight * 2;

        self.cargar_cuentas = function() {
          if ($scope.conceptoid != undefined) {

            financieraRequest.get('concepto_cuenta_contable', $.param({
              query: "Concepto:" + $scope.conceptoid,
              limit: 0
            })).then(function(response) {
              if (response.data != null) {
                $scope.movimientos = response.data;
                for (var i = 0; i < $scope.movimientos.length; i++) {

                  if (!$scope.movimientos[i].CuentaAcreedora) {
                    self.gridOptionsMovimientos.data.push($scope.movimientos[i])
                  }else {
                    self.gridOptionsMovsAcreedores.data.push($scope.movimientos[i])
                  }
                }

                $scope.gridHeight = self.gridOptionsMovimientos.rowHeight * 2 + (self.gridOptionsMovimientos.data.length * self.gridOptionsMovimientos.rowHeight);
                $scope.grid2Height = self.gridOptionsMovsAcreedores.rowHeight * 2 + (self.gridOptionsMovsAcreedores.data.length * self.gridOptionsMovsAcreedores.rowHeight);
              } else {
                $scope.movimientos = [];
                self.gridOptionsMovimientos.data = $scope.movimientos;
                $scope.gridHeight = self.gridOptionsMovimientos.rowHeight * 2;
                $scope.grid2Height = self.gridOptionsMovsAcreedores.rowHeight * 2;
              }
            });

          } else {
            $scope.movimientos = [];
            self.gridOptionsMovimientos.data = $scope.movimientos;
          }
        };

        $scope.$watch('[d_movimientosContables.gridOptionsMovimientos.data,monto,d_movimientosContables.gridOptionsMovsAcreedores.data]', function() {
          if ($scope.monto == undefined) {
            $scope.monto = 0;
          }
          self.suma1=0;
          self.suma2=0;
          self.suma3=0;
          self.suma4=0;
          for (var i = 0; i < self.gridOptionsMovimientos.data.length; i++) {
            self.suma1 = self.suma1 + self.gridOptionsMovimientos.data[i].Debito;
            self.suma2 = self.suma2 + self.gridOptionsMovimientos.data[i].Credito;
          }
          for (var i = 0; i < self.gridOptionsMovsAcreedores.data.length; i++) {
            self.suma3 = self.suma3 + self.gridOptionsMovsAcreedores.data[i].Debito;
            self.suma4 = self.suma4 + self.gridOptionsMovsAcreedores.data[i].Credito;
          }

          //console.log($scope.grid..getColumn("Debito").getAggregationValue());
          if (self.suma1 == self.suma2 && self.suma3 == self.suma4 && self.suma1 == self.suma4) {
              console.log(self.suma1+"="+self.suma2+"="+self.suma3+"="+self.suma4);
            if ($scope.monto != self.suma1) {
              console.log($scope.monto);
              $scope.validatemov = false;
            } else {
              $scope.validatemov = true;
            }
          } else {
            $scope.validatemov = false;
          }
        }, true);

        $scope.$watch('conceptoid', function() {
          self.cargar_cuentas();
        });
      },
      controllerAs: 'd_movimientosContables'
    };
  });
