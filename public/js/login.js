/**
  * Make an Object that encompasses the behavior of this script. This way,
  * only this Objec will be exposed to other scripts, thus reducing the namespace
  * conflicts
  */
var Login = function(){
  
  $('#loginForm').submit(function(){
    $.post('/login', function(response){
     //----receive the post result----// 
    });
  });
};

$(document).ready(function(){
  Login(); 
});
