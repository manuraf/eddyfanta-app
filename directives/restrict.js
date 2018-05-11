angular.module('fantaCalcio')
  .directive('restrict', function(authFactory){
      return{
          restrict: 'A',
          priority: 100000,
          scope: false,
          link: function(){
              // alert('ergo sum!');
          },
          compile:  function(element, attr, linker){
              var accessDenied = true;
              var user = authFactory.getAuthData();
              
              var attributes = attr.access.split(" ");
              if(angular.isDefined(user)){
                for(var i in attributes){
                    if(user.authPermission == attributes[i]){
                        accessDenied = false;
                    }
                }
              }

              if(accessDenied){
                  element.children().remove();
                  element.remove();
              }

          }
      }
  });
