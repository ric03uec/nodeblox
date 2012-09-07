//view model for posts list
//this will fetch all the posts from db and show them
//the vm will be an observable array.
var PostsList = function(){
  var that = this;

  //array to hold all the posts for main page.
  this.postsList = ko.observableArray();
  var postEx = {
    'key' : 'somekey',
    'content' : 'this is post content',
    'subject' : 'this is post subject'
  };
  var postEx1 = {
    'key' : 'somekeysss',
    'content' : 'this is post contensdfsdft',
    'subject' : 'this is post subjecsdfsdft'
  };
  this.postsList.push(postEx);
  this.postsList.push(postEx1);

  //fetch all the posts and save them in the array
  /*
  $.ajax({
    'type' : 'GET',
    'url' : '/posts/all',
    'error' : ajaxFail,
    'success' : function(result, status, xhr){
      that.postsList(result.list);
    }
  });
  */

};
ko.applyBindings(new PostsList(), document.getElementById('allPostsDiv'));
