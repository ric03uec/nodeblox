"use strict";

var util = require('util');
var mongoose = require('mongoose');
var Schema   = mongoose.Schema;
var getId = function(){
  return 'q' + new Date().getTime();
};

var getUpdated = function(){
  return new Date().getTime();
};

var Question = new Schema({
 'qId' : {
    unique : true,
    type : String,
    default: getId
  },
  'uId' : {
    type : Number,
    default : -1
  },

  'question' : {
    type : String,
  },
  
  'lastupdated' : {
    type : Number,
    default : getUpdated
  }
}); 

//find the question by its Id
Question.statics.findQuestion = function(questionId, callback){
  return  this.find({'qId' : questionId}, callback);
};

//find all the questions asked by a user
Question.statics.findUserQuestion = function(userId, callback){
  return  this.find({'uId' :userId}, callback);
};

Question.statics.findAllQuestions = function(callback){
  return this.find(callback);
};

module.exports = mongoose.model('Question', Question);
