app.controller('addStudentController', ['$scope', 'studentDataService', function ($scope, studentDataService) {
  
  $scope.student = {};

  $scope.show = true;

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
}])