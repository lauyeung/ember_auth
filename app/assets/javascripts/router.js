// For more information see: http://emberjs.com/guides/routing/

App.Router.map(function() {
  this.resource('session');
  this.resource('registration', function() {
    this.route('new');
  })
});
