angular.module("fantaCalcio")
.controller('appCtrl', function($scope, authFactory){
  $scope.isAuthenticated = function(){
    return authFactory.isAuthenticated();
  }

  $scope.isAccessEnable = function(role){
    var user = authFactory.getAuthData();

    if(angular.isDefined(user)){
      return user.authPermission === role;
    }
    return false;
  }

  $scope.logout = function(){
    authFactory.logout();
  }

})
