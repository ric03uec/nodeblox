var Admin = {};

Admin.loadScript = function(url){
  var footer = document.getElementById('footer');
  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = url;

  footer.appendChild(script);
}

Admin.initIndexPage = function(){
  var editor = $('#postContent').wysihtml5({
      "font-styles": true, 
      "emphasis": true, 
      "lists": true, 
      "html": false, 
      "link": true,   
      "image": true 
    });
}


$(document).ready(function(response){
  Admin.loadScript('js/admin/post.js');
  Admin.initIndexPage();
  
});
