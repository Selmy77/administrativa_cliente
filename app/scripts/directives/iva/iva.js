'use strict';

/**
 * @ngdoc directive
 * @name financieraClienteApp.directive:iva/iva
 * @description
 * # iva/iva
 */
angular.module('financieraClienteApp')
  .directive('iva', function (financieraRequest, $timeout) {
    return {
      restrict: 'E',
      scope:{
          escritura:'=?'
        },
      templateUrl: 'views/directives/iva/iva.html',
      controller:function($scope){
        var self = this;
        $scope.boton_crear_iva = false;
        $scope.categoria_selet = {};
        $scope.nuevo_iva = null;
        $scope.nueva_categoria = null;
        $scope.actualizar_iva=null;
        $scope.actualizar_categoria = null;

        //actualizar ui-greip operaciones
        //$scope.$watch('escritura', function(){
        //})
        // grid Iva Categoria
        $scope.gridIvaCategoria = {
          enableFiltering: true,
          onRegisterApi: function(gridApi){
            $scope.gridApi = gridApi;
          }
        };
        $scope.gridIvaCategoria.columnDefs = [
          {
            name: 'Id',
            displayName: "Id",
          },
          {
            name: 'Nombre',
            displayName: "Nombre",
          },
          {
            //<button class="btn primary" ng-click="grid.appScope.deleteRow(row)">Delete</button>
            name: 'Operacion',
             enableFiltering: false,
            cellTemplate:
            '<center>\
              <button ng-click="grid.appScope.cargar_ivas(row)" type="button" class="btn btn-success btn-circle"><i class="glyphicon glyphicon-eye-open""></i></button>\
              <button ng-click="grid.appScope.get_categoria(row)" type="button" class="btn btn-success btn-circle"><i class="glyphicon glyphicon-pencil""></i></button>\
            </center>'
          }
        ];
        // grid Iva Categoria
        $scope.gridIva = {
          enableFiltering: true,
          onRegisterApi: function(gridApi){
            $scope.gridApi = gridApi;
          }
        };
        $scope.gridIva.columnDefs = [
          {
            name: 'Id',
            displayName: "Id",
          },
          {
            name: 'CategoriaIva.Nombre',
            displayName: "Categoria",
          },
          {
            name: 'Valor',
            displayName: "Valor",
          },
          {
            //<button class="btn primary" ng-click="grid.appScope.deleteRow(row)">Delete</button>
            name: 'Operacion',
             enableFiltering: false,
            cellTemplate:
            '<center><button ng-click="grid.appScope.get_iva(row)" type="button" class="btn btn-success btn-circle"><i class="glyphicon glyphicon-pencil""></i></button></center>'
          }
        ];
        // refrescar
        self.refresh = function() {
          $scope.refresh = true;
          $timeout(function() {
            $scope.refresh = false;
          }, 0);
        };
        //get categorias
        financieraRequest.get("categoria_iva",
          $.param({
            query:"estado_activo:True"
          })
        ).then(function(response) {
          $scope.gridIvaCategoria.data = response.data;
        });
        //
        $scope.cargar_categorias= function(){
          financieraRequest.get("categoria_iva",
            $.param({
              query:"estado_activo:True"
            })
          ).then(function(response) {
            $scope.gridIvaCategoria.data = response.data;
          });
        }
        //get ivas de una categoria
        $scope.cargar_ivas = function(categoria){
          //console.log(categoria);
          $scope.categoria_selet = categoria.entity;
          $scope.boton_crear_iva=true;
          self.refresh();
          financieraRequest.get("iva",
            $.param({
              query:"estado_activo:True,categoria_iva:"+categoria.entity.Id,
              limit:0,
            })
          ).then(function(response) {
            $scope.gridIva.data = response.data;
          });
        };
        // get iva
        $scope.get_iva=function(iva){
          //console.log(iva);
          if ($scope.ver_crear_iva == true){
            $scope.ver_crear_iva = !$scope.ver_crear_iva;
          }
          $scope.boton_crear_iva = !$scope.boton_crear_iva;
          $scope.ver_actualizar_iva = !$scope.ver_actualizar_iva;
          //
          $scope.actualizar_iva = iva.entity;
        }
        // update iva
        $scope.actualiza_iva=function(){
          if($scope.actualizar_iva){
            financieraRequest.put("iva",$scope.actualizar_iva.Id ,$scope.actualizar_iva).then(function(response){
              console.log(response.data)
              $scope.cargar_ivas({'name': 'hola', 'entity': $scope.categoria_selet})
              $scope.actualizar_iva=null;
            });
          }
        }
        // add iva
        $scope.agregar_iva=function(){
          if($scope.nuevo_iva){
            $scope.nuevo_iva.CategoriaIva = $scope.categoria_selet;
            $scope.nuevo_iva.EstadoActivo = true;
            financieraRequest.post("iva", $scope.nuevo_iva).then(function(response){
              $scope.cargar_ivas({'name': 'hola', 'entity': $scope.categoria_selet})
              $scope.nuevo_iva=null;
            });
          }
        }
        // get categoria
        $scope.get_categoria=function(categoria){
          if ($scope.ver_crear_categoria == true){
            $scope.ver_crear_categoria = !$scope.ver_crear_categoria;
          }
          $scope.boton_crear_categoria = !$scope.boton_crear_categoria;
          $scope.ver_actualizar_categoria = !$scope.ver_actualizar_categoria;
          $scope.actualizar_categoria = categoria.entity;
        }
        // update categoria
        $scope.actualiza_categoria=function(){
          if($scope.actualizar_categoria){
            financieraRequest.put("categoria_iva",$scope.actualizar_categoria.Id ,$scope.actualizar_categoria).then(function(response){
              //console.log(response.data)
              $scope.cargar_categorias()
              $scope.actualizar_categoria=null;
            });
          }
        }
        // add categoria
        $scope.agregar_categoria = function (){
          if($scope.nueva_categoria){
            $scope.nueva_categoria.EstadoActivo=true;
            financieraRequest.post("categoria_iva", $scope.nueva_categoria).then(function(response){
              //console.log(response.data)
              $scope.cargar_categorias();
              $scope.nueva_categoria=null;
            });
          }
        }
      //
      },
      controllerAs:'d_iva'
    };
  });
