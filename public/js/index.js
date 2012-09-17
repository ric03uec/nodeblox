//this is the main file which will be instantiated upon js load in browser
//require the basic libraries here
//require('jquery');

//define a module here that will initialize main page widgets
define([
    'jquery', 
    'knockout', 
    'login', 
    './vm/postsList',
    'signup',
    'admin',
    'bootstrap-modal'],
    function($, KO, Login, Posts, Signup, Admin){
  var Index = {};
  
  Index.initialize = function(){
    //including 'Login' module will not initialize it, its function will have to be called
    //explicitly
    Login();
    Posts();
    Signup();
    Admin();
  };
  return Index;
});
