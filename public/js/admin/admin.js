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
    var postSubject = $('#postSubject').val();
    var postContent = $('#postContent').val();
    var postTags = $('#postTags').val();

    console.log(postSubject);
    console.log(postContent);
    $.post('/admin/save/post', function(respose){
      if(response.retStatus === 'success'){
        console.log('saved successfully');
      }else{
      } 
    });
      
  });

}


$(document).ready(function(response){
//  Admin.loadScript('js/admin/post.js');
  Admin.initIndexPage();
  
});
