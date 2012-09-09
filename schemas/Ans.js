"use strict";

var util = require('util');
var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var getId = function(){
  return 'a' + new Date().getTime();
};

var Answer = new Schema({
 'aId' : {
    unique : true,
    type : String,
    default: getId
  },
  'qId' : {
    type : String,
    default: -1
  },
  'uId' : {
    type : Number,
    default : -1
  },
  'username' : {
    type : String
  },
  'answer' : {
    type : String,
  }
}); 

//find the Answer by its Id
Answer.statics.findAnswer = function(AnswerId, callback){
  return  this.find({'aId' : AnswerId}, callback);
};

//find all the Answers given by a user
Answer.statics.findUserAnswer = function(userId, callback){
  return  this.find({'uId' :userId}, callback);
};

//find all the answers to a question
Answer.statics.findAnswer = function(questionId, callback){
  return  this.find({'qId' : questionId}, callback);
};

module.exports = mongoose.model('Answer', Answer);
