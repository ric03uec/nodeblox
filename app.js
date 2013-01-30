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
var path = require('path');
var http = require('http');

var app  = express();
mongoose.connect('mongodb://localhost/testdb');

/**
  * Application Configuration
  */
app.configure(function(){
  app.set('views', __dirname + '/views');
  app.enable('jsonp callback');
  app.set('view engine', 'jade');
  app.set('view options', {layout : false});
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
  app.use(express.static(path.join(__dirname + '/public')));
});



/**
  * Application environment(s) Configuration
  */
app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('stage', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  //use redis store witht the following configuration
  var redisConfig = {
    'host' : '127.0.0.1',
    'port' : 6397
  };
  //also run r.js here
  app.use(express.errorHandler()); 
});

// Routes
require('./routes')(app);

//app.listen(2727);
//util.log("Express server listening on port " + app.address().port + " in mode " + app.settings.env);
//logger.log("Express server listening on port " + app.address().port + " in mode " + app.settings.env);
http.createServer(app).listen(config.port, function(){
  logger.log("Express server listening on port " + config.port);
});

module.exports = app; 
