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
    templateUrl: '../templates/form.html',
    controller: ['$scope', 'studentDataService', function ($scope, studentDataService) {
      $scope.student = {};
      $scope.addStudent = function () {
        studentDataService.addStudent(this.student)
          .then(function () {
            getStudents();
          });
        $scope.student = {};
      }

      var getStudents = function () {
        studentDataService.getAllStudents()
        .then(function(students) {
          $scope.students = students.data.data;
        });
      }

      getStudents(); 
    }]
  }
});

app.directive('appTable', function () {
  return {
    restrict: 'EA',
    templateUrl: '../templates/table.html',
    controller: ['$scope', 'studentDataService', function ($scope, studentDataService) {
      $scope.student = {};

      $scope.show = true;
      
      var getStudents = function () {
        studentDataService.getAllStudents()
        .then(function(students) {
          $scope.students = students.data.data;
        });
      }

      $scope.deleteStudent = function (id) {
        studentDataService.deleteStudent(id)
          .then(function (){
            getStudents();
          });
      }

      $scope.editStudent = function () {
        this.show = true;
        console.log(this.student);
        console.log($scope.student);
        studentDataService.editStudent(this.student)
          .then(function () {
            getStudents();
          });
      }

      $scope.makeEditable = function () {
        this.show = false;
        console.log(this.show);
      }

      getStudents();
    }]
  }
});

app.directive('appLogin', function () {
  return {
    restrict: 'EA',
    templateUrl: '../templates/login.html',
    controller: ['$scope', '$location', 'authService', function($scope, $location, authService) {
      $scope.user = {};
      $scope.login = function() {
        authService.login($scope.user)
          .then(function(user) {
            authService.setUserInfo(user);
            $location.path('/');
          })
          .catch(function(err) {
            // check status code, send appropriate message
            console.log(err);
          });
      };
    }]
  }
});

app.directive('appRegister', function () {
  return {
    restrict: 'EA',
    templateUrl: '../templates/register.html',
    controller: ['$scope', '$location', 'authService', function($scope, $location, authService) {
      $scope.user = {};
      $scope.register = function() {
        authService.register($scope.user)
          .then(function(user) {
            authService.setUserInfo(user);
            $location.path('/');
          })
          .catch(function(err) {
            // check status code, send appropriate message
            console.log(err);
          });
      };
    }]
  }
});

app.directive('contenteditable', ['$sce', function($sce) {
  return {
    restrict: 'A', // only activate on element attribute
    require: '?ngModel', // get a hold of NgModelController
    link: function(scope, element, attrs, ngModel) {
      if (!ngModel) return; // do nothing if no ng-model

      // Specify how UI should be updated
      ngModel.$render = function() {
        element.html($sce.getTrustedHtml(ngModel.$viewValue || ''));
      };

      // Listen for change events to enable binding
      element.on('blur', function() {
        scope.$apply(update);
      });
      read(); // initialize

      // Write data to the model
      function read() {
        var html = element.html();
        // When we clear the content editable the browser leaves a <br> behind
        // If strip-br attribute is provided then we strip this out
        if ( attrs.stripBr && html == '<br>' ) {
          html = '';
        }
        // ngModel.$setViewValue(html);
        ngModel.$render();
      }
      function update() {
        var html = element.html();
        // When we clear the content editable the browser leaves a <br> behind
        // If strip-br attribute is provided then we strip this out
        if ( attrs.stripBr && html == '<br>' ) {
          html = '';
        }
        ngModel.$setViewValue(html);
        // ngModel.$render();
      }
      // ----------------

      // function read() {
      //   ngModel.$setViewValue(element.html());
      // }

      // ngModel.$render = function() {
      //   element.html(ngModel.$viewValue || "");
      // };

      // element.bind("blur keyup change", function() {
      //   scope.$apply(read);
      // });
    }
  };
}]);