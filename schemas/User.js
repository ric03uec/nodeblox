'use strict'

var util    = require('util');
var bcrypt  = require('bcrypt');
var mongoose = require('mongoose');
var Schema   = mongoose.Schema;


var validatePresenceOf = function(value){
  return value && value.length; 
};

var toLower = function(string){
  return string.toLowerCase();
};

var User = new Schema({
  'email' : { type : String, 
              validate : [validatePresenceOf, 'an email is required'],
              set : toLower,
              index : { unique : true }
              },
  'password' : String,
});

User.statics.findUser = function(email, password, cb){
  return  this.find({'email' : email}, cb);
};

User.statics.validateUser = function(email, password, cb){
  this.find({'email' : email}, function(err, response){
    var user = response[0];
    if(!user){
      cb(new Error('AuthFailed : Username does not exist'));
    }else{
      if(password == user.password){
        util.log('Authenticated User ' + email);
        cb(null, user);
      }else{
        cb(new Error('AuthFailed : Invalid Password'));
      }
    }
  });
};


module.exports = mongoose.model('User' , User);
