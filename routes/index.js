'use strict'

var util = require('util');
var Logger = require('devnull');
var logger = new Logger({namespacing : 0});
var User  = require('../schemas/User');
var Ans = require('../schemas/Ans');
var Post = require('../schemas/Post');
var Ques = require('../schemas/Ques');
var Parse = require('./parse');

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
    logger.log('Serving request for url [GET]' + req.route.path);
    Post.getAll(function(err, allPosts){
      if(!err && allPosts){
        res.render('index', {'allPosts' : allPosts});
      }else{
        util.log('Error fetching posts from database : ' + err);
        res.render('error');
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

  app.get('/admin/remove/:key', function(req, res){
    //container for deleting a post
  });

  app.get('/contact', function(req, res){
    util.log('Serving request for url[GET] ' + req.route.path);
    res.render('contact');
  });

  //--------------------------------------------------//
  //get all the questions across all the users
  app.get('/ques/all', function(req, res){
    util.log('Serving request for url[GET] ' + req.route.path);
    //get all the posts
    Parse.getAll(function(err, list){
      if(!err && list){
        res.json({
          'retStatus' : 'success',
          'listAll' : list
        });
      }else{
        util.log('[routes] Error while fetching questions list ' + util.inspect(err));
        res.json({
          'retStatus' : 'failure'
        });
      }
    });
  });

  app.post('/question/new', function(req, res){
    var ques = new Ques();
    ques.question = req.body.question;
    ques.uId = req.session.user.key;

    ques.save(function(err, result){
      if(!err && result){
        util.log('successfully saved new question ' + util.inspect(result));
        res.json({
          'retStatus' : 'success'
        });
      }else{
        util.log('error saving new question');
        res.json({
          'retStatus' : 'failure'
        });
      }
    });
  });

  //get all the questions for a particular user
  app.post('/answer/:quesId', function(req, res){
    var qId = req.params.quesId;
    var ansString = req.body.answer;

    var answer = new Ans();
    answer.qId = qId;
    answer.uId = req.session.user.key;
    answer.username = req.session.user.username;
    answer.answer = ansString;
    answer.save(function(err, result){
      if(!err && result){
        util.log('successfully saved answer ' + util.inspect(result));
        Ques.update({'qId' : qId}, {lastupdated : new Date().getTime()}, function(err, updateRes, raw){
          if(!err && updateRes){
            res.json({
              'retStatus' : 'success'
            });
          }else{
            res.json({
              'retStatus' : 'failure'
            });   
          }
        });
      }else{
        util.log('error while saving answer ' + util.inspect(err));
        res.json({
          'retStatus' : 'failure'
        });
      }
    });
  });
   
  app.get('/validate', function(req, res){
    if(req.session.user){
      res.json({
        'retStatus' : 'success'
      });
    }else{
      res.json({
        'retStatus' : 'failure'
      });
    }
  });
};
