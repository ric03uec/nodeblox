'use strict'

var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost/testdb');
var User  = require('../schemas/User');

var testUser = new User({ 
          'username' : 'test',
          'password' : 'test'});
testUser.save();
process.exit();
