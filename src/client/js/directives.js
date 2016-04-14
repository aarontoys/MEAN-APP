// app.directive('appLogin', function () {
//   return {
//     restrict: 'E',
//     templateUrl: '../login.html',
//     transclude: true
//   }
// })

app.directive('appForm', function () {
  return {
    restrict: 'EA',
    templateUrl: '../form.html'
  }
});

app.directive('appTable', function () {
  return {
    restrict: 'EA',
    templateUrl: '../table.html'
  }
});
