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
  'tags' : {
            type : String,
            set : toLower
           }
});

/**
  * Get complete post details for all the posts
  */
Post.statics.getAll = function(cb){
  var query = this.find({});
  query.sort('key', -1);
  return query.exec(cb);
};

/**
  * Get only the meta information of all the posts.
  */
Post.statics.getAllMeta = function(cb){
  return this.find({}, ['key','subject', 'author', 'tags'], cb);
};

Post.statics.findByKey = function(key, cb){
  return this.find({'key' : key}, cb);
};

module.exports = mongoose.model('Post', Post);
