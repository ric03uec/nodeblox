/**
  * View model to show the posts List on the front Page
  */
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
          var allPosts = result.allPosts;
          for(var i=0; i<result.allPosts.length; i++){
            var date = new Date(allPosts[i].key);
            allPosts[i].date = date.getDate() + ' / ' + (date.getMonth()+1) + ' / ' + date.getFullYear();
          }
          that.postsList(result.allPosts);
        }
      }
    });
  };

  return function(){
    KO.applyBindings(new PostsList(), document.getElementById('allPostsDiv'));
  };
});
