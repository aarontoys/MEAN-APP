app.controller('addStudentController', ['$scope', 'studentDataService', function ($scope, studentDataService) {
  
  $scope.student = {};

  $scope.addStudent = function () {
    console.log(this.student);
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
    console.log('controller: deleteStudent', id);
    studentDataService.deleteStudent(id)
      .then(function (){
        getStudents();
      });
  }

  getStudents();
}])