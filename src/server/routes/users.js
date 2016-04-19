var express = require('express');
var router = express.Router();
var moment = require('moment');
var jwt = require('jwt-simple');
var config = require('../../_config');

var User = require('../models/users')

router.post('/register', function(req, res, next) {
  //ensure usere does note already exist
  User.findOne({email: req.body.email}, function (err, user) {
    if (err) {
      return next(err);
    }
    if (user) {
      return res.status(409).json({
        status: 'fail',
        message: 'Email already exist'
      });
    }
    // create a new user
    var newUser = new User(req.body);
    newUser.save(function(){
      // create token
      var token = generateToken(newUser);
      res.status(200).json({
        status: 'success',
        data: {
          token: token,
          user: newUser.email
        }
      });
    });
  });
});

router.post('/login', function(req, res, next) {
  //ensure user exists
  User.findOne({email: req.body.email}, function (err, user) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({
        status: 'fail',
        message: 'Email does not exist'
      });
    }
  //compare the plain text password tithe the hashed/salted password
  user.comparePassword(req.body.password, function(err, match) {
    if (err) {
      return next(err);
    }
    if (!match) {
      return res.status(401).json({
        status: 'fail',
        message: 'Password does not exist'
      }); 
    }
    user = user.toObject();
    // delete user.password;
      // create token
    var token = generateToken(user);
    res.status(200).json({
      status: 'success',
      data: {
        token: token,
        user: user.email
      }
    });
  });
});
});

router.get('/logout', function(req, res, next) {

});



//generate a token
function generateToken(user) {
  var payload = {
    exp: moment().add(14,'days').unix(),
    iat: moment().unix(),
    sub: user._id
  }
  return jwt.encode(payload, config.TOKEN_SECRET);
}



module.exports = router;

