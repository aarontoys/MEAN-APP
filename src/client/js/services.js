app.service('studentDataService', ['crudService', function (crudService) {
  

  return {
    getAllStudents: function (){
      return crudService.getAll('students')
        .then(function(students) {
          console.log(students);
          return students;
        });
    },
    addStudent: function (payload) {
      return crudService.addOne('students', payload)
        .then(function(student) {
          console.log('service:15: ', student);
          return student;
        })
    },
    deleteStudent: function (payload) {
      return crudService.deleteOne('students', payload)
        .then(function(student) {
          console.log('service: line 22: ', student , ' has been deleted');
        })
        .catch(function (err) {
          console.log('service line 25: err: ', err);
        })
    }
  };

}]);

app.service('crudService', ['$http', function ($http) {

  return {
    getAll: function (resource) {
      return $http.get('/'+resource)
        .then(function(res){
          return res;
        })
        .catch(function(err) {
          return err;
        })
    },
    addOne: function(resource, payload) {
      return $http.post('/'+resource, payload)
        .then(function(res){
          return res;
        })
        .catch(function(err) {
          return err;
        })
    },
    deleteOne: function(resource, payload) {
      console.log('service: deleteOne', payload);
      return $http.post('/' + resource +'/delete/' + payload) 
        .then(function(res){
          return res;
        })
        .catch(function(err) {
          return err;
        });
    }
  }
}]);