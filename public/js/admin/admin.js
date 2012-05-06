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

  $('#postForm').submit(function(event){
    event.preventDefault();    

    var postContent = {
      'postSubject' : $('#postSubject').val(),
      'postContent' : $('#postContent').val(),
      'postTags' : $('#postTags').val()
    };

    $.post('/admin/save/post', {'postContent' : postContent},function(response){
      if(response.retStatus === 'success'){
        console.log('saved successfully');
        $(location).attr('href', '/');
      }else{
      } 
    });
      
  });

}


$(document).ready(function(response){
//  Admin.loadScript('js/admin/post.js');
  Admin.initIndexPage();
  
});
