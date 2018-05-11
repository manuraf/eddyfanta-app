angular.module("fantaCalcio")
  .constant("competizioneUrl", "http://localhost:8080/eddyfantacalcio/competizione")
  .constant("squadreByCompUrl", "http://localhost:8080/eddyfantacalcio/squadre/competizione")
  .constant("updateSquadraUrl", "http://localhost:8080/eddyfantacalcio/squadre/update")
  .constant("competizioneActiveClass", "btn-primary")
  .controller("mercatoCtrl", function($scope, $http, squadreByCompUrl, competizioneUrl, updateSquadraUrl, competizioneActiveClass){

    $scope.competizioni;
    var competizioneSelected = null;
    $scope.squadre;
    $scope.players = ["Vazquez"];

    $http.get(competizioneUrl)
      .success(function (data) {
        $scope.competizioni = data;
      })
      .error(function (error) {
        $scope.error = error;
    });

    function Giocatore(nome,cognome,quota){
      this.nome = nome;
      this.cognome = cognome;
      this.quota = quota;
    }

    $scope.getCompetizioneClass = function (competizione) {
      return competizioneSelected == competizione ? competizioneActiveClass : "btn-success";
    }

    $scope.getSquadre = function(competizione){
      $http.get(squadreByCompUrl+'/'+competizione)
        .success(function (data) {
          $scope.squadre = data;

          for(var i=0;i<$scope.squadre.length;i++){
            $scope.squadre[i].somma = 1000;
            $scope.squadre[i].portieri.forEach(function(elem){   $scope.squadre[i].somma-=elem.quota; });
            $scope.squadre[i].difensori.forEach(function(elem){   $scope.squadre[i].somma-=elem.quota; });
            $scope.squadre[i].centrocampisti.forEach(function(elem){   $scope.squadre[i].somma-=elem.quota; });
            $scope.squadre[i].attaccanti.forEach(function(elem){   $scope.squadre[i].somma-=elem.quota; });
          }
        })
        .error(function (error) {
          $scope.error = error;
      });
    }

    $scope.salva = function(squadra){
      delete squadra.newPortiere;
      delete squadra.newDifensore;
      delete squadra.newCentro;
      delete squadra.newAttaccante;
      delete squadra.msg;

      $http.post(updateSquadraUrl,squadra)
        .success(function (boolean) {
          squadra.msg = boolean ? 'Success' : 'Error';
        })
        .error(function (error) {
          squadra.msg = 'Error';
        });
    }

    $scope.inserisci = function(squadra,newGiocatore,ruolo){
      if(newGiocatore.originalObject === null) return;
      switch(ruolo) {
        case 1: squadra.portieri.push(newGiocatore.originalObject); break;
        case 2: squadra.difensori.push(newGiocatore.originalObject); break;
        case 3: squadra.centrocampisti.push(newGiocatore.originalObject); break;
        case 4: squadra.attaccanti.push(newGiocatore.originalObject); break;
      }
      squadra.somma-=newGiocatore.originalObject.quota;
      newGiocatore.originalObject =  null;
    }

    $scope.updatePlayers = function(typed){
      console.log(typed);
      if(typed.length > 3) { $scope.players = ["Vazquez","Neymar"]; }
    }

    $scope.elimina = function(squadra,indexOf){
      console.log(squadra);
      squadra.splice(indexOf, 1);
    }

  });
