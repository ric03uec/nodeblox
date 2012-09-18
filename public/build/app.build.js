({
  appDir : './../js',
  baseUrl : './',
  dir : './release',
  paths : {
    'jquery' : 'lib/jquery/jquery',
    'knockout' : 'lib/knockout/knockout',
    'bootstrap' : 'lib/bootstrap/bootstrap.min',
    'wysihtml5-rc' : 'lib/bootstrap/wysihtml5-0.3.0_rc2',
    'bootstrap-wysihtml5' : 'lib/bootstrap/bootstrap-wysihtml5',
    'bootstrap-modal' : 'lib/bootstrap/bootstrap-modal'
  },
  findNestedDependencies : true,
  optimize : "uglify",
  modules : [
    {
      name : "main"
    }
  ],
})
