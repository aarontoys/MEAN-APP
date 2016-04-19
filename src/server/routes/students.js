var express = require('express');
var router = express.Router();

var Students = require('../models/students');
var ensureAuthenticated = require('./users')
var ensureAdmin = require('./users')

//GET ALL students

router.get('/', ensureAuthenticated, function(req, res, next) {
  Students.find({})
    .then(function(result) {
      res.status(200).json({
        status: 'success',
        data: result
      });
    })
    .catch(function (err) {
      return next(err);
    })

  //old way without promises

  // Students.find({}, function (err, students) {
  //   if(err) {
  //     return next(err)
  //   }
  //   res.status(200).json({
  //     status: 'success',
  //     data: students
  //   });
  // });
});

// get single student

router.get('/:id', function(req, res, next) {
  studentId = req.params.id;
  Students.findOne({_id: studentId})
    .then(function (result) {
      res.status(200).json({
        status: 'success',
        data: result
      });
    })
    .catch(function (err) {
      return next(err);
    })

  // Students.findOne({}, function (err, students) {
  //   if(err) {
  //     return next(err)
  //   }
  //   res.status(200).json({
  //     status: 'success',
  //     data: students
  //   });
  // });
});

// add new student

router.post('/', function(req, res, next) {
  var student = new Students(req.body);
  student.save()
    .then(function (result) {
      res.status(200).json({
        status: 'success',
        data: result
      });
    })
    .catch(function (err) {
      return next(err);
    })

  // student.save(function (err, newStudent) {
  //   if(err) {
  //     return next(err)
  //   }
  //   res.status(200).json({
  //     status: 'success',
  //     data: newStudent
  //   });
  // });
});

//update student

router.put('/edit/:id', function(req, res, next) {
  var id = req.params.id;
  var student = new Students(req.body);
  console.log('line 90',id);
  console.log('line92',student);
  Students.findByIdAndUpdate(id, student, {new: true})
    .then(function (result) {
      res.status(200).json({
        status: 'success',
        data: result
      });
    })
    .catch(function (err) {
      return next(err);
    });

  // (function (err, newStudent) {
  //   if(err) {
  //     return next(err)
  //   }
  //   res.status(200).json({
  //     status: 'success',
  //     data: newStudent
  //   });
  // });
});

//remove student

router.post('/delete/:id', function (req, res, next) {
  var student = req.params.id;
  Students.findByIdAndRemove(student)
    .then(function (result) {
      res.status(200).json({
        status: 'success',
        data: result
      });
    })
    .catch(function (err) {
      return next(err);
    });
});

function ensureAuthenticated(req, res, next) {
  console.log('line 133');
  //check headers & presence of auth object
  if(!(req.headers && req.headers.authorization)){
    return res.status(401).json({
      status: 'fail',
      message: 'No headers present or no authorization header'
    });
  }

  //decode the token
  var header = req.headers.authorization.split(' ');
  var token = header[1];
  var payload = jwt.decode(token, config.TOKEN_SECRET);
  var now = moment().unix();
  //ensure that it is valid
  if(now > payload.exp) {
    return res.status(401).json({
      status: 'fail',
      message: 'Token is invalid'
    });
  }
  //ensure user is still in the database
  User.findById(payload.sub, function(err, user) {
    if(err) {
      return next(err);
    }
    if(!user) {
      return res.status(401).json({
        status: 'fail',
        message: 'User does not exist'
      });
    }
    // attach user to request objecct
    req.user = user;
    //call next middleware
    next();
  })
}

function ensureAdmin(req, res, next) {
  //check for the user object
  //ensure for admin === true on user object
  if(!(req.user && req.user.admin)) {
    return res.status(401).json({
      status: 'fail',
      message: 'User is not an admin'
    });
  }
  next();
}

module.exports = router;
