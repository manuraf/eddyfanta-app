angular.module("fantaCalcio")
  .constant("squadreUrl", "http://localhost:8080/eddyfantacalcio/squadre")
  .constant("competizioniUrl", "http://localhost:8080/eddyfantacalcio/competizioni")
  .constant("partecipazioniUrl", "http://localhost:8080/eddyfantacalcio/partecipazioni")
  .controller("squadreCtrl", function($scope, $http, squadreUrl,partecipazioniUrl,competizioniUrl){
    $http.get(squadreUrl)
      .success(function (data) {
        $scope.squadre = data;
      })
      .error(function (error) {
        $scope.error = error;
    });

    $scope.selectedSquadra;
    $scope.newPartecipazione;
    $scope.competizioni;

    $scope.selectSquadra = function(squadra) {
      $http.get(squadreUrl+'/'+squadra.id)
        .success(function (data) {
          $scope.selectedSquadra = data;

        })
        .error(function (error) {
          $scope.error = error;
      });

      $http.get(competizioniUrl)
        .success(function (data) {
          $scope.competizioni = data;
        })
        .error(function (error) {
          $scope.error = error;
      });

    };

    $scope.createSquadra = function(squadra){
      $http.post(squadreUrl,squadra)
        .success(function (newSquadra) {
          $scope.squadre.push(newSquadra);
        })
        .error(function (error) {
          $scope.error = error;
        });
    }

    $scope.addPartecipazione = function(competizione,selectedSquadra){
      var partecipazione = {competizione:competizione, squadra:selectedSquadra}

      $http.post(partecipazioniUrl,partecipazione)
        .success(function (id) {
          partecipazione.id = id;
          $scope.selectedSquadra.partecipazioni.push(partecipazione);
        })
        .error(function (error) {
          $scope.error = error;
        });
    }

  });
