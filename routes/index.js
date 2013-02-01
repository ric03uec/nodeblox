'use strict';

var util = require('util');
var Logger = require('devnull');
var logger = new Logger({namespacing : 0});
var User  = require('../schemas/User');
var Post = require('../schemas/Post');

/**
  * Get Meta information about all the Post's
  */
var getAllMeta = function(req, res, next){
  Post.getAllMeta(function(err, postsList){
    if(!err && postsList){
      req.postsList = postsList;
    }
    next(err);
  });
};

/**
  * validate the signup credentials entered by the user
  * @param {String} username 
  * @param {String} pass1 : first password
  * @param {String} pass2 : verification password
  */
var validateUserData = function(username, pass1, pass2){
  if(pass1.trim() !== pass2.trim()){
    util.log('Passwords not Matching ' + pass1 + ' ' + pass2);
    return 'Passwords not Matching';
  }
  return '';
  //put any other validations here
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
    Post.getAll(function(err, allPosts){
      if(!err && allPosts){
        res.render('index', {'allPosts' : allPosts});
      }else{
        util.log('Error fetching posts from database : ' + err);
        res.render('error');
      }
    });
  });

  app.get('/posts/all', function(req, res){
    logger.log('Serving request for url [GET]' + req.route.path)
    Post.getAll(function(err, allPosts){
      if(!err && allPosts){
        res.json({
          'retStatus' : 'success',
          'allPosts' : allPosts
        });
      }else{
        util.log('Error fetching posts from database : ' + err);
        res.json({
          'retStatus' : 'failure',
        });
      }
    });
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
    var signupForm = req.body.signupForm;
    var username = signupForm.username;
    var pass1 = signupForm.pass1;
    var pass2 = signupForm.pass2;

    var validateMsg = validateUserData(username, pass1, pass2);
    if(validateMsg !== ''){
      res.json({
        'retStatus' : 'failure',
        'message' : validateMsg
      });
    }else{
      var newUser = new User();
      newUser.username = username;
      newUser.password = pass1;

      newUser.save(function(err, savedUser){
        var message = '';
        var retStatus = '';
        if(!err){
          util.log('Successfully created new user with Username : ' + username);
          message = 'Successfully created new user : ' + username;
          retStatus = 'success';
          req.session.user = savedUser;
        }else{
          util.log('Error while creating user : ' + username + ' error : ' + util.inspect(err));
          if(err.code === 11000){
            message = "User already exists";
          }
          retStatus = 'failure';
        }
        res.json({
          'retStatus' : retStatus,
          'message' : message
        });
      });
    }
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

    if(postContent.postKey === '' || postContent.postKey === undefined){
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
          util.log('Error saving the Post : ' + err);
          res.json({
          'retStatus' : 'failure',
            'error' : err
          });
        }
      });
    }else{
      var conditions = {'key' : postContent.postKey};
      var update = {
        'subject' : postContent.postSubject,
        'content' : postContent.postContent,
        'tags' : postContent.postTags
      };

      Post.update(conditions, update, null, function(err, numAffected){
        if(!err && numAffected){
          util.log('Successfully updated the Post with id : ' + postContent.postKey);
          res.json({
            'retStatus' : 'success',
            'numAffected' : numAffected
          });
        }else{
          util.log('Error updating the Post with id : ' + postContent.postKey + ' ' + err);
          res.json({
            'retStatus' : 'failure'
          });
        }
      });
    }
  });

  app.get('/post/show/:key', function(req, res){
    Post.findByKey(req.params.key, function(err, postData){
      if(!err && postData){
      postData = postData[0];
        res.json({
          'retStatus' : 'success',
          'postData' : postData
        });
      }else{
        util.log('Error in fetching Post by key : ' + req.params.key);
        res.json({
          'retStatuts' : 'failure',
          'msg' : 'Error in fetching Post by key ' + req.params.key
        });
      }
    }); 
  });

  app.post('/admin/save/', function(req, res){
    //container for saving a post
  });

  app.post('/post/delete/', function(req, res){
    logger.log('Serving request for url [GET]' + req.route.path);
    var response = {
      'retStatus' : 'failure',
      'msg' : 'Error while deleting post by key '
    };

    if(req.body && req.body.hasOwnProperty('post_id')){
      var postId = req.body['post_id'];
      Post.removeByKey(postId, function(err, removeResponse){
        if(!err && removeResponse){
          logger.log('successfully deleted post with id : ' + removeResponse);
          
          response['retStatus'] = 'success';
          response['msg'] = 'Successfully deleted post';

        }
        res.json(response);
      });
    }else{
      res.json(response);
    }
  });

  app.get('/contact', function(req, res){
    util.log('Serving request for url[GET] ' + req.route.path);
    res.render('contact');
  });
  
  app.get('/about', function(req, res){
    util.log('Serving request for url[GET] ' + req.route.path);
    res.render('about');
  });
};
