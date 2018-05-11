angular.module("fantaCalcio")
  .constant("schieraUrl", "http://localhost:8080/eddyfantacalcio/utenti")
  .controller("schieraCtrl", function($scope, $http, $location, schieraUrl,authFactory){
    $scope.formazione;
    $scope.msg;
    $scope.playerOptions;


    $http.get(schieraUrl+'/formazione')
      .success(function (data) {
        $scope.formazione = data;
        $scope.changeModulo(data.modulo[0],data.modulo[1],data.modulo[2]);

        $http.get(schieraUrl+'/options')
          .success(function (options) {
            $scope.playerOptions = options;
          })
          .error(function (error) {
            $scope.error = error;
          });
      })
      .error(function (error) {
        $scope.authenticationError = error;
      });

    $scope.changeModulo = function(d,c,a) {
      //$scope.formazione.titolari = null;
      $scope.df = Number(d);
      $scope.cc = Number(c);
      $scope.at = Number(a);
      $scope.formazione.modulo = d+''+c+''+a;
    }

    $scope.inviaFormazione = function(formazione) {
      $http.post(schieraUrl+'/invia',formazione)
        .success(function (data) {
          $scope.msg = 'Formazione inviata con successo!!'
        })
        .error(function (error) {
          $scope.error = error;
          $scope.msg = 'Errore invio formazione!!';
        });
    }

  });
