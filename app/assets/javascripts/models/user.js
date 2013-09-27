var attr = DS.attr;

App.User = DS.Model.extend({

  username: attr(),
  first_name: attr(),
  last_name: attr()

});
