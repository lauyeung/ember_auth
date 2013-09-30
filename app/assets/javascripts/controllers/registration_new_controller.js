App.RegistrationNewController = Ember.ObjectController.extend({
  needs: 'session',

  actions: {
    signUp: function() {
      userInfo = this.getProperties('username', 'email', 'first_name', 'last_name', 'password', 'password_confirmation');
      data = {user: userInfo};
      $.post('/registrations', data, null, 'json').then(this.onDidCreate.bind(this), this.onError.bind(this));
    },
    cancel: function() {
      this.transitionToRoute('index');
      return this.get('content').rollback();
    }
  },
  onDidCreate: function(response) {
    var sessionsController = this.get('controllers.session');
    this.store.push('user', response.user);
    sessionsController.setCurrentUser(response.user.id);
    return this.transitionToRoute('index');
  },
  onError: function(error) {
    if (Ember.isEqual(error.status, 422)) {
      return this.get('content').set('errors', error.responseJSON.errors);
    } else {
      return alert("Validation error occured - " + error.responseText);
    }
  }
});

// data = this.getProperties('username', 'password');
//       $.post('/session/', data, null, 'json').then(function (response) {
//         self.set('errorMessage', response.message);
//         self.setCurrentUser(response.user_id);
//       });

// register: function(route) {
//     var me;
//     me = this;
//     return $.ajax({
//       url: App.urls.register,
//       type: "POST",
//       data: {
//         "user[name]": route.currentModel.name,
//         "user[email]": route.currentModel.email,
//         "user[password]": route.currentModel.password,
//         "user[password_confirmation]": route.currentModel.password_confirmation
//       },
//       success: function(data) {
//         me.set('currentUser', data.user);
//         return route.transitionTo('home');
//       },
//       error: function(jqXHR, textStatus, errorThrown) {
//         return route.controllerFor('registration').set("errorMsg", "That email/password combo didn't work.  Please try again");
//       }
