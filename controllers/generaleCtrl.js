angular.module("fantaCalcio")
  .constant("generaleUrl", "http://localhost:8080/eddyfantacalcio/classifica/generale")
  .controller("generaleCtrl", function($scope, $http, generaleUrl){
    $scope.classifiche;

    $http.get(generaleUrl)
      .success(function (data) {
        $scope.classifiche = data;
      })
      .error(function (error) {
        $scope.error = error;
    });

  });
