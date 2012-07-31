var Signup = function(){
  $('#signupConfirm').click(function(){
    Signup.validateForm();
  });
}

Signup.validateForm = function(){
  var username = $('#username').val();
  var email = $('#useremail').val();
  var pass1 = $('#passwordFirst').val();
  var pass2 = $('#passwordSecond').val();

  console.log(pass1);
  console.log(pass2);

};

Signup();
