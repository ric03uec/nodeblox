"use strict";

var util = require('util');
var Ques = require('../schemas/Ques');
var Ans = require('../schemas/Ans');
var User = require('../schemas/User');
var Async = require('async');

var mongoose = require('mongoose');
var Parse = {};

var getQuesUser = function(quesArr, next){
  var quesList = [];
  var getUser = function(quesObj, callback){
    process.nextTick(function(){
      var quesEntry = {};
      User.findByKey(quesObj.uId, function(err, user){
        if(!err && user && user.length){
          quesEntry.question = quesObj.question;
          quesEntry.qId = quesObj.qId;
          quesEntry.username = user[0].username;      
          quesEntry.lastupdated = quesObj.lastupdated;
          quesEntry.answers = [];
          quesList.push(quesEntry);
          callback(null);
        }else{
          util.log('error occured or no user associated with question ' + util.inspect(err));
          callback(err);
        }
      });
    });
  };

  var allQues = []; 
  var getAns = function(quesEntry, callback){
    Ans.findAnswer(quesEntry.qId, function(err, ansList){
      if(!err && ansList){
        for(var i = 0 ; i < ansList.length; i++){
          var ansEntry = {
            'answer' : ansList[i].answer,
            'username' : ansList[i].username
          };
          quesEntry.answers.push(ansEntry);
        }
        allQues.push(quesEntry);
        callback(null);
      }else{
        util.log('error occured or no answer exists for the question');
        callback(err);
      }
    });
  };

  Async.forEach(quesArr, getUser, function(err){
    if(!err && quesList.length){
      Async.forEach(quesList, getAns, function(err){
        if(!err){
          util.log('successfully fetched all the questions ');
          allQues.sort(function(a, b){
            return b.lastupdated - a.lastupdated;
          });
          next(null, allQues);
        }else{
          next(err);
        }
      });
    }else{
      util.log('error occcured or no data ' + util.inspect(err));
      next(new Error('error occured'));
    }
  });
};


//----------------Public api ----------------------//
/**
  * Get all the questions with all the answers,
  * for every question
  *   get the associated user
  *   get all the answers
  *     for all the answers
  *       get associated users
  */
Parse.getAll = function(callback){
  Ques.findAllQuestions(function(err, result){
    if(!err && result && result.length){
      getQuesUser(result, callback);
    }else{
      util.log('error fetching all the questions ' + util.inspect(err));
      callback(err);
    }
  });
};

module.exports = Parse;
//------------------Test Code------------------//
if(require.main === module){
  (function(){
    function logcb(err, result){
      util.log(util.inspect(err || result));
    }
    
    Parse.getAll(logcb);
  })();
}
