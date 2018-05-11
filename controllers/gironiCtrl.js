angular.module("fantaCalcio")
  .constant("competizioneUrl", "http://localhost:8080/eddyfantacalcio/competizioni")
  .constant("classificaByCompUrl", "http://localhost:8080/eddyfantacalcio/classifica/competizione")
  .constant("partiteByCompUrl", "http://localhost:8080/eddyfantacalcio/partite/competizione")
  .constant("partiteUrl", "http://localhost:8080/eddyfantacalcio/partite")
  .constant("competizioneActiveClass", "btn-primary")
  .controller("gironiCtrl", function($scope, $http, competizioneUrl, classificaByCompUrl, partiteByCompUrl, partiteUrl, competizioneActiveClass){
    $scope.classifiche;
    $scope.partite;
    $scope.competizioni;
    var competizioneSelected = null;
    $scope.giornata = 1;

    $http.get(competizioneUrl)
      .success(function (data) {
        $scope.competizioni = data;
      })
      .error(function (error) {
        $scope.error = error;
    });

    $scope.getClassifica = function(competizione) {
      competizioneSelected = competizione;

      $http.get(classificaByCompUrl+'/'+competizione.id)
        .success(function (data) {
          $scope.classifiche = data;
        })
        .error(function (error) {
          $scope.error = error;
      });
    }

    $scope.getPartite = function(competizione,giornata){
      competizioneSelected = competizione;

      $http.get(partiteByCompUrl+'/'+competizione.id+'/'+giornata)
        .success(function (data) {
          $scope.partite = data;
        })
        .error(function (error) {
          $scope.error = error;
      });
    }

    $scope.getGironeClass = function (competizione) {
      return competizioneSelected == competizione ? competizioneActiveClass : "btn-success";
    }

    $scope.detailPartita = function(partita){
      $scope.selectedPartita = partita;

      $http.get(partiteUrl+'/'+partita.id)
        .success(function (data) {
          $scope.selectedPartita = data;
        })
        .error(function (error) {
          $scope.error = error;
      });
    }

    $scope.tornaFormazioni = function() { $scope.selectedPartita = null; }

    $scope.getGiocatoreClass = function(prestazione){
      console.log(prestazione);
      //if(prestazione.ammonito == 'true') { return 'background-color: yellow'; }
      if(prestazione.espulso == 'true') { return 'red'; }
      return '';
    }

  });
