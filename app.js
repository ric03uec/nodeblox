'use strict';

/**
 * Module dependencies.
 */
var express = require('express');
var util    = require('util');
var config = require('./config');
var Logger = require('devnull');
var logger = new Logger({namespacing : 0});
var mongoose = require('mongoose');
var RedisStore = require('connect-redis')(express);
var redis = require('redis');
var path = require('path');
var http = require('http');


var app  = express();
mongoose.connect('mongodb://localhost/testdb');

/**
  * Application Global Configuration
  */
app.configure(function(){
  app.set('views', __dirname + '/views');
  app.enable('jsonp callback');
  app.set('view engine', 'jade');
  app.set('view options', {layout : false});
  app.use(express.static(path.join(__dirname + '/public')));
});

/**
  * Application environment(s) Configuration
  */
app.configure('development', function(){

  app.use(express.bodyParser());
  app.use(express.cookieParser());
  app.use(express.session({
    secret : 'devadotD'      
  }));
  app.use(express.methodOverride());

  app.use(function(req, res, next){
    res.locals.session = req.session;
    next();
  });

  app.use(app.router);
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('stage', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  //use redis store witht the following configuration
  //also run r.js here
  var redisClient = redis.createClient();

  app.use(express.bodyParser());
  app.use(express.cookieParser());
  var sessionStore = new RedisStore({
    client: redisClient
  });
  app.use(express.session({
    store : sessionStore, 
    secret: 'nooneknowsthis'
  }));
  app.use(express.methodOverride());

  app.use(function(req, res, next){
    res.locals.session = req.session;
    next();
  });

  app.use(app.router);
  app.use(express.errorHandler()); 
});

// Routes
require('./routes')(app);

http.createServer(app).listen(config.port, function(){
  logger.log("Express server listening on port " + config.port + " in environment: " + app.settings.env);
});

module.exports = app; 
