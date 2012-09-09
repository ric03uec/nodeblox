//view model for posts list
//this will fetch all the posts from db and show them
//the vm will be an observable array.
var PostsList = function(){
  var that = this;

  //array to hold all the posts for main page.
  this.quesList= ko.observableArray();

  getAllQues(this.quesList);

  answerThis = function(){
    var qId =$(this).attr('qId');
    var answer = $('#inp' + qId).val();
    var warnMsg= $("#warn" + qId);
    $.get('/validate', function(response){
      if(response.retStatus === 'success'){
        $.post('/answer/' + qId, {'answer' : answer}, function(response){
          if(response.retStatus === 'success'){
            showMessage(warnMsg, 'Successfully Saved Answer', true);
            getAllQues(that.quesList);
          }else{
            showMessage(warnMsg, 'Error while saving Answer', false);
          }
        });
      }else{
        showMessage(warnMsg, 'Please Login First', false);
      }
    });
  };

  this.refreshContent = function(){
    getAllQues(that.quesList);
  };
};

var showMessage = function(domElement, message, isSuccess){
  domElement.text(message);
  domElement.css('visibility', 'visible');
  domElement.removeClass();
  if(isSuccess){
    domElement.addClass('label').addClass('label-success');
  }else{
    domElement.addClass('label').addClass('label-important');
  }
  var t = setTimeout(function(){
    domElement.text('');
    domElement.css('visibility', 'hidden');
  }, 3000);
};

var getAllQues = function(quesList){
  $.ajax({
    'type' : 'GET',
    'url' : '/ques/all',
    'error' : ajaxFail,
    'success' : function(result, status, xhr){
      if(result.retStatus === 'success'){
        quesList(result.listAll);
      }
    }
  });
};

var ajaxFail = function(xhr, textStat, errorThrown){

};

var postsList = new PostsList();

ko.applyBindings(postsList, document.getElementById('allPostsDiv'));
