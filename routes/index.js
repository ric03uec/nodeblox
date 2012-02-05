'use strict'

var util = require('util');
var Logger = require('devnull');
var logger = new Logger({namespacing : 0});
var User  = require('../schemas/User');
/*
 * GET home page.
 */
module.exports = function(app){
  /**
    * Map the URL '/' to the callback
    */
  app.get('/', function(req, res){
    logger.log('Serving request for url [GET]' + req.route.path)
    
    res.render('index', { title: 'nodeBlox' })
  });

  /**
    * Map the URL '/login' to the callback
    */
  app.post('/login', function(req, res){
    logger.log('Serving request for url [POST] ' + req.route.path);
    var username = req.body.User;
    var password = req.body.Password;
  
    User.validateUser(username, password, function(err, user){
      if(err && !user){
        logger.error('Login failed');
        res.render('user/authFailed', {title : 'nodeBlox'});
      }else{
        res.json({
          message : 'success',
          user : user
        });
      }
    });
  });

  /**
    * Add a new User to database
    */
  app.post('/signup', function(req, res){
    util.log('Serving request for url [POST] ' + req.route.path);
    
    var username = req.body.User;
    var password = req.body.Password;

    util.log('Username' + username + '   Pass ' + password);
  });
};
