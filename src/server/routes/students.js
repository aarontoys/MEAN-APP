var express = require('express');
var router = express.Router();

var Students = require('../models/students');

//GET ALL students

router.get('/', function(req, res, next) {
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

module.exports = router;
