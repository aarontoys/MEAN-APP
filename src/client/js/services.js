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

 app.service('authService', ['$http', '$window', function($http, $window) {
  var user = {};
  return {
    login: function(user) {
      return $http.post('/users/login', user);
    },
    logout: function(user) {
      user = null;
      $window.localStorage.clear();
    },
    register: function(user) {
      return $http.post('/users/register', user);
    },
    setUserInfo: function(userData) {
      $window.localStorage.setItem('user', JSON.stringify(userData.data.data.user));
      $window.localStorage.setItem('token', JSON.stringify(userData.data.data.token));
    },
    getUserInfo: function(userData) {
      $window.localStorage.getItem('user');
    },
  };
}]);

app.service('authInterceptor', ['$window', function($window) {
  return {
    request: function(config) {
      // check for token in headers
      // config.headers['X-requested-with'] = XMLHttpRequest;
      var token = $window.localStorage.getItem('token');
      if(token) {
        config.headers.Authorization = "Bearer ",   token;
        // return $q.resolve(config);
      }
      return config;
    }
  };

}]);