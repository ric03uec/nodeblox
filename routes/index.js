'use strict'

/*
 * GET home page.
 */
module.exports = function(app){
  /**
    * Map the URL '/' to the callback
    */
  app.get('/', function(req, res){
    res.render('index', { title: 'Express' })
  });
};
