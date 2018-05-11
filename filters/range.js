angular.module("customFilters", [])
.filter("range", function ($filter) {
  return function (data, da, offset) {
    if (angular.isArray(data) && angular.isNumber(da) && angular.isNumber(offset)) {
      var array = [];
      for(var i=--da; i<da+offset; i++) { array.push(data[i]); }
      return array;
    } else {
      return data;
    }
  }
})
