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
    $.post('/login', $(this).serialize(), function(response){
      $('#loginForm').hide();
      $('#loginPrompt').html('Authenticated');
    });
  });
};

$(document).ready(function(){
  Login(); 
});
