//this is the main file which will be instantiated upon js load in browser
//require the basic libraries here
//require('jquery');

//define a module here that will initialize main page widgets
define(['jquery', 'knockout', 'bootstrap-wysihtml5'], function($, KO){
  var Index = {};
  var abc = $('#signupMessage').val();
  console.log(abc);
  console.log(KO);
  console.log($('#postContent1'));
  $('#postContent1').wysihtml5({
    "font-styles": true, 
    "emphasis": true, 
    "lists": true, 
    "html": false, 
    "link": true,   
    "image": true 
    });



  Index.initialize = function(){
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
