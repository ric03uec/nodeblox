var Main = {};

Main.loadScript = function(url){
  var footer = document.getElementById('footer');
  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = url;

  footer.appendChild(script);
};

Main.initUrls = function(){
  $('#submitQues').click(function(e){
    e.preventDefault();
    $.get('/validate', function(response){
      var warnMessage = $("#submitWarn");
      if(response.retStatus === 'success'){
        var question = $("#inputQuestion").val();
        $.post('/question/new', {'question' : question}, function(saveRes){
          if(saveRes.retStatus === 'success'){
            showMessage(warnMessage,'Submitted question', true);
            postsList.refreshContent();
          }else{
            showMessage(warnMessage, 'Error saving question', false);
          }
        });
      }else{
        showMessage(warnMessage,'Login First', false);
      }
    });
  });
};

$(document).ready(function(response){
  Main.loadScript('js/login.js');
  Main.loadScript('js/signup.js');
  Main.initUrls();
});
