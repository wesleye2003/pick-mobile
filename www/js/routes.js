angular.module('starter', ['ionic', 'ionic.contrib.ui.tinderCards'])
.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  // home page and register
  .state('home', {
    url: '/home',
    templateUrl: 'templates/home.html',
    controller: 'homeCtrl'
  })
  .state('register', {
    url: '/register',
    templateUrl: 'templates/register.html',
    controller: 'registerCtrl'
  })
  
  // start of app after login/register
  .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/sideMenu.html',
    controller: 'AppCtrl'
  })

  // profile page
  .state('app.profile', {
    // placeholder url until we know for sure
    url: '/profile/:userId',
    templateUrl: 'templates/profile.html',
    controller: 'profileCtrl'
  })

  // edit profile page
  .state('app.profile.edit', {
    url: '/profile/:userId/edit',
    templateUrl: 'templates/editProfile.html',
    controller: 'editProfileCtrl'
  })

  // edit roles on profile
  .state('app.profile.edit.my-roles', {
    url: '/profile/:userId/edit/my-roles',
    templateUrl: 'templates/editMyRoles.html',
    controller: 'editMyRolesCtrl'
  })
  // edit most frequent roles searched
  .state('app.profile.edit.search-roles', {
    url: '/profile/:userId/edit/search-roles',
    templateUrl: 'templates/editSearchRoles.html',
    controller: 'editSearchRolesCtrl'
  })
  // start picking with current user
  .state('app.profile.start-picking', {
    url: '/profile/:userId/start-picking',
    views: {
      'menuContent': {
        templateUrl: 'templates/startPicking.html',
        controller: 'startPickingCtrl',
      }
    }
  })
  // see all picks on your account
  .state('app.profile.picks', {
    url: '/profile/:userId/picks',
    templateUrl: 'templates/picks.html',
    controller: 'picksCtrl'
  })
  // app settings page
  .state('app.settings', {
    url: '/settings',
    views: {
      'menuContent': {
        templateUrl: 'views/settings/settings.html',
        controller: 'settingsCtrl'
      }
    }
  })

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/home');

});
