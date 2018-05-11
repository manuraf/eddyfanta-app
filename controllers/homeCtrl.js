angular.module("fantaCalcio")
  .constant("competizioniUrl", "http://localhost:8080/eddyfantacalcio/competizioni")
  .constant("parametroUrl", "http://localhost:8080/eddyfantacalcio/parametri")
  .constant("partiteByCompUrl", "http://localhost:8080/eddyfantacalcio/partite/competizione")
  .constant("classGenraleByGiornata", "http://localhost:8080/eddyfantacalcio/classifica/generale")
  .controller("homeCtrl", function($scope, $http, competizioniUrl,partiteByCompUrl,parametroUrl,classGenraleByGiornata) {
    $scope.competizioni;
    $scope.classifiche;
    $scope.giornata;

    $http.get(parametroUrl+'/giornata')
      .success(function (data){
        $scope.giornata = data;

        $http.get(classGenraleByGiornata+'/'+data)
          .success(function (data){
            $scope.classifiche = data;
          })
          .error(function (error) {
            $scope.error = error;
        });

        $http.get(competizioniUrl)
          .success(function (data) {
            $scope.competizioni = data;

            $scope.competizioni.forEach(function(competizione){
              competizione.partite = [];

              $http.get(partiteByCompUrl+'/'+competizione.id+'/'+$scope.giornata)
                .success(function (data) {
                  competizione.partite = data;
                })
                .error(function (error) {
                  $scope.error = error;
              });
            })
          })
          .error(function (error) {
            $scope.error = error;
        });

      })
      .error(function (error) {
        $scope.error = error;
    });




  });
