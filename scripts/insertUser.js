'use strict';

var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost/testdb');
var User  = require('../schemas/User');
var util = require('util');

var testUser = new User({ 
          'username' : 'test2',
          'password' : 'test2'});
testUser.save(function(err, response){
  util.log(err || response);
  process.exit();
});
