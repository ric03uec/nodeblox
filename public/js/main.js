//this will be the bootstrap js for initializing the requirejs config

//global configuration. put the global script paths here
requirejs.config({
  baseUrl : '/js/',
  paths : {
    'jquery' : 'lib/jquery/jquery',
    'knockout' : 'lib/knockout/knockout',
    'bootstrap' : 'lib/bootstrap/bootstrap.min',
    'bootstrap-modal' : 'lib/bootstrap/bootstrap-modal',
    'wysihtml5-rc' : 'lib/bootstrap/wysihtml5-0.3.0_rc2',
    'bootstrap-wysihtml5' : 'lib/bootstrap/bootstrap-wysihtml5'
  },

  shim : {
    'bootstrap' : ['jquery'],
    'bootstrap-modal' : ['bootstrap'],
    'wysihtml5-rc' : ['bootstrap'],
    'bootstrap-wysihtml5' : ['wysihtml5-rc']
  }
});

//initialize the main router here..
//since this is a require and not define, there is no need to return an object
require(['index'], function(Index){
  console.log("initializing main function");
  Index.initialize();
});
