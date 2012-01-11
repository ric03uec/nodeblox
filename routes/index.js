'use strict'

var util = require('util')
/*
 * GET home page.
 */
module.exports = function(app){
  /**
    * Map the URL '/' to the callback
    */
  app.get('/', function(req, res){
    util.log('Serving request for url [GET]' + req.route.path)
    
    res.render('index', { title: 'nodeBlox' })
  });

  /**
    * Map the URL '/login' to the callback
    */
  app.post('/login', function(req, res){
    util.log('Serving request for url [POST] ' + req.route.path); 
  });
};
