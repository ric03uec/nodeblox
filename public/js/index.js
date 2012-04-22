function loadScript(url, callback){
  var footer = document.getElementById('footer');
  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = url;

  script.onreadystatechange = callback;
  script.onload = callback;

  footer.appendChild(script);
}

function initIndexPage(){
  console.log('initializing');
  var editor = $('#postArea').wysihtml5({
      "font-styles": true, //Font styling, e.g. h1, h2, etc. Default true
      "emphasis": true, //Italics, bold, etc. Default true
      "lists": true, //(Un)ordered lists, e.g. Bullets, Numbers. Default true
      "html": false, //Button which allows you to edit the generated HTML. Default false
      "link": true, //Button to insert a link. Default true
      "image": true //Button to insert an image. Default true;
    });
}

$(document).ready(function(response){
  loadScript('js/login.js', function(){
    console.log('Login.js Loaded');  
  });
  
  initIndexPage();
});
