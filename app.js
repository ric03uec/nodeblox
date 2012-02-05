'use strict'

/**
 * Module dependencies.
 */
var express = require('express');
var util    = require('util');
var Logger = require('devnull');
var logger = new Logger({namespacing : 0});
var mongoose = require('mongoose');
var app  = express.createServer();

mongoose.connect('mongodb://localhost/testdb');

/**
  * Application Configuration
  */
app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.set('view options', {layout : false});
  app.use(express.bodyParser());
  app.use(express.cookieParser());
  app.use(express.session({
    secret : 'abcdefg'      
  }));
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

/**
  * Application environment(s) Configuration
  */
app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});

// Routes
require('./routes')(app);

app.listen(2727);
util.log("Express server listening on port " + app.address().port + " in mode " + app.settings.env);
logger.log("Express server listening on port " + app.address().port + " in mode " + app.settings.env);

module.exports = app; 
