var Signup = function(){
  $('#signupConfirm').click(function(){
    Signup.submitForm();
  });
};

Signup.submitForm = function(){

  var signupForm = {
    username : $('#signupUser').val(),
    email : $('#signupEmail').val(),
    pass1 : $('#passwordFirst').val(),
    pass2 : $('#passwordSecond').val()
  };
  //run some basic validations
  $.post('/signup', {'signupForm' : signupForm}, function(response){
    if(response.retStatus === 'success'){
      Signup.showMessage($('#signupMessage'), 'Successfully Signed up ', true);
      $(location).attr('href', '/admin');
    }else{
      Signup.showMessage($('#signupMessage'), 'Error Creating New User : ' + response.message, false);
    }
  });
};

Signup.showMessage = function(domElement, message, success){
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

Signup();
