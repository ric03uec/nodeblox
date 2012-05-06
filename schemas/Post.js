'use strict';

var util = require('util');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var validatePresenceOf = function(value){
  return value && value.length; 
};

var toLower = function(string){
  return string.toLowerCase();
};

var getId = function(){
  return new Date().getTime();
};

/**
  * The Post schema. we will use timestamp as the unique key for each post
  */
var Post = new Schema({
  'key' : {
    unique : true,
    type : Number,
    default: getId
  },
  'subject' : { type : String,
                validate : [validatePresenceOf, 'Subject is Required']
              },
  'content' : {type : String},
  'author': String,
  'tags' : {type : String,
            set : toLower
           }
});

module.exports = mongoose.model('Post', Post);
