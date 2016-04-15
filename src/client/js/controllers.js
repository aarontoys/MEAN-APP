app.controller('addStudentController', ['$scope', 'studentDataService', function ($scope, studentDataService) {
  
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

  $scope.deleteStudent = function (id) {
    studentDataService.deleteStudent(id)
      .then(function (){
        getStudents();
      });
  }

  getStudents();
}])