var mongoose = require('mongoose');
mongoose.Promise = require('bluebird')
var Schema = mongoose.Schema;
var faker = require('faker');


var StudentSchema = new Schema({
  fName: {
    type: String,
    required: true,
  },
  lName: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  }
});

var Student = mongoose.model('student', StudentSchema);

// var student = new Student({
//   fName: faker.name.firstName(),
//   lName: faker.name.lastName(),
//   year: faker.random.number(6)
// });

// student.save()
//   .then(function (student) {
//     console.log('success: ',student);
//   })
//   .catch(function (err) {
//     console.log('error: ',err);
//   })

module.exports = Student;
