'use strict'

var util = require('util');
var Logger = require('devnull');
var logger = new Logger({namespacing : 0});
var User  = require('../schemas/User');
var Post = require('../schemas/Post');

var getAllMeta = function(req, res, next){
  Post.getAllMeta(function(err, postsList){
    if(!err && postsList){
      console.log(postsList);
      req.postsList = postsList;
    }
    next(err);
  });
};

/*
 * GET home page.
 */
module.exports = function(app){
  /**
    * Map the URL '/' to the callback
    */
  app.get('/', function(req, res){
    logger.log('Serving request for url [GET]' + req.route.path)
    
    res.render('index')
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
        res.json({
          retStatus : 'failure'  
        });
      }else{
        req.session.user = user;
        res.json({
          retStatus : 'success',
          user : user
        });
      }
    });
  });

  /**
    * Logout the current user and clear the session
    */
  app.get('/logout', function(req, res){
    logger.log('Serving request for url [GET] ' + req.route.path);
    req.session.user = undefined;
    res.redirect('/');
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

  app.get('/admin', getAllMeta, function(req, res){
    util.log('Serving request for url [GET] ' + req.route.path);    
    if(req.session.user){
      res.render('post', {'postsList' : req.postsList});
    }else{
      res.redirect('/');
    }
  });

  /**
    * Save the post to database
    */
  app.post('/admin/save/post', function(req, res){
    var postContent = req.body.postContent;

    var post = new Post();
    post.subject  = postContent.postSubject;
    post.content  = postContent.postContent;
    post.author   = req.session.user.username;
    post.tags     = postContent.postTags;

    post.save(function(err, response){
      if(!err && response){
        util.log('Successfully saved Post with id : ' + response.id);
        res.json({
          'retStatus' : 'success',
          'data' : response
        })
      }else{
        res.json({
          'retStatus' : 'failure',
          'error' : err
        });
      }
    });
  });

  app.get('/post/show/:key', function(req, res){
    Post.findByKey(req.params.key, function(err, postData){
      if(!err && postData){
      postData = postData[0];
      console.log(postData);
      /**
        * TODO : cannot work this way because the text in wysihtml5 box has to be set through its jquery methods
        */
        res.render('editPost', {'postData' : postData});
      }else{
        util.log('Error in fetching Post by key : ' + req.params.key);
      }
    }); 
  });

  app.post('/admin/save/', function(req, res){
    //container for saving a post
  });

  app.get('/admin/remove/:key', function(req, res){
    //container for deleting a post
  });

  app.get('/contact', function(req, res){
    util.log('Serving request for url[GET] ' + req.route.path);
    res.render('contact');
  });
};
