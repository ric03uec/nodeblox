define(['jquery'], function($){
  var initSubmitForm = function(){
    $('#signupConfirm').click(function(){
      submitForm();
    });
  };


  var submitForm = function(){
    var signupData = {
      username : $('#signupUser').val(),
      email : $('#signupEmail').val(),
      pass1 : $('#passwordFirst').val(),
      pass2 : $('#passwordSecond').val()
    };
      //run some basic validations  
    $.post('/signup', {'signupForm' : signupData}, function(response){
      if(response.retStatus === 'success'){
        showMessage($('#signupMessage'), 'Successfully Signed up ', true);
        $(location).attr('href', '/admin');
      }else{
        showMessage($('#signupMessage'), 'Error Creating New User : ' + response.message, false);
      }
    });
  };

  var showMessage = function(domElement, message, success){
    domElement.removeClass();
    domElement.addClass('alert');
    domElement.css('display', 'block');
    domElement.text(message);
    if(success === true){
      domElement.addClass('alert-success');
    }else{
      domElement.addClass('alert-error');
    }
    var t = setTimeout(function(){
      domElement.css('display', 'none');
    }, 5000);
  };

  return function(){
    initSubmitForm();
  };
});
