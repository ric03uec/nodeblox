/**
  * Make an Object that encompasses the behavior of this script. This way,
  * only this Objec will be exposed to other scripts, thus reducing the namespace
  * conflicts
  */
var Login = function(){
  
  $('#loginForm').submit(function(event){
    /**
      * Prevent the form from taking default action.
      */
    event.preventDefault();
    var username = $('#username').val();
    var password = $('#password').val();

    /**
      * Do this check because the form submits even on Sign Up
      * button click
      */
    if(username && password){
      $.post('/login', $(this).serialize(), function(response){
        $('#loginForm').hide();
        $('#loginPrompt').html('Authenticated');
      });
    }
  });
  
  $('#my-modal').modal({
    backdrop:'static',
    keyboard:'true'
  });
  $('#my-modal').modal('toggle');
  
};

$(document).ready(function(){
  Login(); 
});
