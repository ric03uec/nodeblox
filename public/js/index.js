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
});
