var mongoose = require('mongoose');
var Schema = mongoose.Schema;

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

module.exports = Student;