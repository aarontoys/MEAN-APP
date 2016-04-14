var express = require('express');
var router = express.Router();

var Students = require('../models/students');

//GET ALL students

router.get('/', function(req, res, next) {
  Students.find({}, function (err, students) {
    if(err) {
      return next(err)
    }
    res.status(200).json({
      status: 'success',
      data: students
    });
  });
});

// get single student

router.get('/:id', function(req, res, next) {
  studentId = req.params.id;
  Students.findOne({}, function (err, students) {
    if(err) {
      return next(err)
    }
    res.status(200).json({
      status: 'success',
      data: students
    });
  });
});

// add new student

router.post('/', function(req, res, next) {
  var student = new Students(req.body);
  student.save(function (err, newStudent) {
    if(err) {
      return next(err)
    }
    res.status(200).json({
      status: 'success',
      data: newStudent
    });
  });
});

//update student

router.put('/:id', function(req, res, next) {
  var student = new Students(req.body);
  student.save(function (err, newStudent) {
    if(err) {
      return next(err)
    }
    res.status(200).json({
      status: 'success',
      data: newStudent
    });
  });
});

module.exports = router;
