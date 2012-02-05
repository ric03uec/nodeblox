/**
  * Make an Object that encompasses the behavior of this script. This way,
  * only this Object will be exposed to other scripts, thus reducing the namespace
  * conflicts
  */
var Login = function(){

  $('#logininfo').hide();
  /**
    * Login form submit
    */
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
        if(response.message === 'success'){
          $('#loginForm').hide();
          $('#signup-btn').hide();
          $('#logininfo').html('Authenticated');
          $('#logininfo').show();
        }else{
          $('#signup-error-modal').modal('show');
        }
      });
    }
  });
  
  $('#signup-modal').modal({
    backdrop:'static',
    keyboard:'true'
  });
  $('#signup-modal').modal('toggle');
  
  $('#signup-error-modal').modal({
    backdrop:'static',
    keyboard:'true'
  });
  
  $('#signup-error-modal').modal('toggle');
  
};

/**
  * Initialize all the elements defined in this object
  */
Login();
