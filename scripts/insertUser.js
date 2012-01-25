'use strict'

var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost/testdb');
var User  = require('../schemas/User');

var testUser = new User({ 
          'username' : 'test1',
          'password' : 'test1'});
testUser.save();
process.exit();
