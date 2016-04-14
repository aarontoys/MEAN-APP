var Student = require('../students');

var data = [
  {
    fName: 'Aaron',
    lName: 'Toys',
    year: 1998
  },
  {
    fName: 'Nicki',
    lName: 'Toys',
    year: 1996
  }
]

function runSeed (done) {
  var student = new Student(data[0]);
  student.save(function(err, res) {
    done();
  })
}

module.exports = {
  runSeed: runSeed
}