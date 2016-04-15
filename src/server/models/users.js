var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcryptjs')
var config = require('../../_config');

var UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  admin: {
    type: Boolean,
    default: false 
  }
});

//hash the password before saving it

UserSchema.pre('save', function (next) {
  var user = this;
  // only hash pw if new or modified
  if (!user.isModified('password')) {
    return next();
  }
  //generate salt
  bcrypt.genSalt(config.SALT_WORK_FACTOR, function(err, salt) {
    if(err) {
      return next(err);
    }
    //hash pw
    bcrypt.hash(user.password, salt, function(err, hash) {
      if (err) {
        return next(err);
      }
      user.password - hash;
      // go to the next middleware function
      next();
    });
     //override the plain-text pw with new hashed salted pw
  });
});

//compare the pw to verify plain text against the hashed pw
UserSchema.methods.comparePassword = function(password, done) {
  bcrypt.compare(password, this.password, function (err, match) {
    if (err) {
      return done(err);
    }
    done (err, match);
  })
}


var User = mongoose.model('user', UserSchema);

module.exports = User;