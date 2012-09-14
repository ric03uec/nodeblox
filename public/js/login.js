//make this a requirejs module and then initialize the functions here
define(['jquery'], function($){
  //handler for login fields
  var initLoginHandler = function(){
     $('#loginForm').submit(function(event){
      //Prevent the form from taking default action.
      event.preventDefault();
      var username = $('#username').val();
      var password = $('#password').val();

      /**
        * Do this check because the form submits even on Sign Up
        * button click
        */
      if(username && password){
        $.post('/login', $(this).serialize(), function(response){
          if(response.retStatus === 'success'){
            $('#loginForm').hide();
            $('#signup-btn').hide();
            $(location).attr('href', '/admin');
          }else if(response.retStatus === 'failure'){
            $('#signup-error-modal').modal('show');
          }
        });
      }
    });

    $('#logout-btn').click(function(){
      $.get('/logout', function(response){  
      });
    });
  };

  var initModals = function(){
    $('#signup-modal').modal({
      backdrop:'static',
      keyboard:'true'
    });
    $('#signup-modal').modal('toggle');

  /**
    * FIXME: This is a workaround for signup modal not working.
    * will be removed once modal toggle is fixed.
    */
    $('#signup-btn').live('click', function(){
      $('#signup-modal').modal('show');
    });
  
    $('#signup-error-modal').modal({
      backdrop:'static',
      keyboard:'true'
    });
    $('#signup-error-modal').modal('toggle');
  };

  return function(){
    initLoginHandler();
    initModals();
  };   
});
