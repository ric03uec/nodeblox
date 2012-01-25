'use strict'

var util = require('util')
var User  = require('../schemas/User');
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
    util.log(util.inspect(req.session));
  });

  /**
    * Map the URL '/login' to the callback
    */
  app.post('/login', function(req, res){
    util.log('Serving request for url [POST] ' + req.route.path);
    var username = req.body.User;
    var password = req.body.Password;
  
    User.validateUser(username, password, function(err, user){
      if(err && !user){
        res.render('user/authFailed', {title : 'nodeBlox'});
      }else{
        res.json({
          message : 'success',
          user : user
        });
      }
    });
  });
};
