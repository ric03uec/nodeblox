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
    console.log('indexjs initialized....');
  };
  return Index;
});



/*
var Main = {};

Main.loadScript = function(url){
  var footer = document.getElementById('footer');
  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = url;

  footer.appendChild(script);
}


$(document).ready(function(response){
  Main.loadScript('js/login.js');
  Main.loadScript('js/signup.js');
  Main.initUrls();
});*/
