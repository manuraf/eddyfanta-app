angular.module("fantaCalcio")
  .constant("loginUrl", "http://localhost:8080/eddyfantacalcio/login")
  .controller("loginCtrl", function($scope, $http, $location, loginUrl,authFactory){
    $scope.formazione;
    $scope.msg;
    $scope.playerOptions;

    $scope.login = function (user,password) {
        authFactory.login({ password:password, user:user }).success(function (data) {
            authFactory.setAuthData(data);
            $location.path('/home');
        }).error(function () {
            // Error handling
        });
    };

  });
