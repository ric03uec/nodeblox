define(['jquery', 'knockout'], function($, KO){
  //method to call when ajax request fails
  var ajaxFail = function(xhr, retStatus, error){
    console.log('error fetching data ');
    console.log(error);
  };
  var PostsList = function(){
    var that = this;
    //array to hold all the posts for main page.
    this.postsList = KO.observableArray();
  
    $.ajax({
      'type' : 'GET',
      'url' : '/posts/all',
      'error' : ajaxFail,
      'success' : function(result, status, xhr){
        if(result.retStatus === 'success'){
          that.postsList(result.allPosts);
        }
      }
    });
  };

  return function(){
    KO.applyBindings(new PostsList(), document.getElementById('allPostsDiv'));
  };
});
