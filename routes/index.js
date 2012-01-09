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
    util.log('Serving request for url ' + req.route.path)
    
    res.render('index', { title: 'nodeBlox' })
  });
};
