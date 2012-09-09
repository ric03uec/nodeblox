'use strict';

var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost/testdb');
var User  = require('../schemas/User');
var Ques  = require('../schemas/Ques');
var Ans   = require('../schemas/Ans');
var util = require('util');

/*var testUser = new User({ 
          'username' : 'test2',
          'password' : 'test2'});
testUser.save(function(err, response){
  util.log(err || response);
  process.exit();
});
*/
//get a user
//insert a question
//get user
//answer that question
var logcb = function(err, response){
  console.log(err || response);
};

//Ques.findAllQuestions(logcb);
//User.findByKey(1345690522225, logcb);
var ans = new Ans();
ans.aId= 'a1347180809609';
ans.username = "test1";
ans.save(logcb);

/*
User.findUser('test1', function(err, result){
  util.log('found a user ' + util.inspect(err || result));
  var q = new Ques();
  q.uId = result[0].key;
  q.question = "what is earth?";
  q.save(function(err, resAsk){
    console.log(err, resAsk);
    var ans = new Ans();
    ans.qId = resAsk.qId;
    ans.uId = resAsk.uId;
    ans.username = result[0].username;
    ans.answer = 'earth is in the solar system';

    ans.save(function(err, resAns){
      console.log(err, resAns);

    });
  });
});
*/
