app.service('studentDataService', ['crudService', function (crudService) {
  

  return {
    getAllStudents: function (){
      return crudService.getAll('students')
        .then(function(students) {
          return students;
        })
        .catch(function(err) {
          return next(err);
        });
    },
    addStudent: function (payload) {
      return crudService.addOne('students', payload)
        .then(function(student) {
          return student;
        })
        .catch(function(err) {
          return next(err);
        });
    },
    deleteStudent: function (payload) {
      return crudService.deleteOne('students', payload)
        .then(function(student) {
        })
        .catch(function (err) {
          return next(err);
        });
    },
    editStudent: function (payload) {
      return crudService.editOne('students', payload)
        .then(function(student) {
          return student;
        })
        .catch(function(err) {
          return next(err);
        });
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
      return $http.post('/' + resource +'/delete/' + payload) 
        .then(function(res){
          return res;
        })
        .catch(function(err) {
          return err;
        });
    },
    editOne: function(resource, payload) {
      console.log(payload);
      id = payload._id

      return $http.put('/' + resource +'/edit/' + id, payload)
        .then(function(res) {
          return res;
        })
        .catch(function(err) {
          return err;
        })
    }
  }
}]);