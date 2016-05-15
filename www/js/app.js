// Ionic App - Pick

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers','starter.services', 'starter.directives', 'ionic.contrib.ui.tinderCards', 'ngResource'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

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
    // url: '/profile/:userId',
    url: '/profile',
    views: {
        'menuContent': {
          templateUrl: 'templates/profile.html',
          controller: 'profileCtrl'
        }
      }
  })

  // edit profile page
  .state('app.edit-profile', {
    // url: '/profile/:userId/edit',
    url: '/edit-profile',
    views: {
        'menuContent': {
          templateUrl: 'templates/editProfile.html',
          controller: 'editProfileCtrl'
        }
    }
  })

  // edit roles on profile
  .state('app.edit-my-roles', {
    // url: '/profile/:userId/edit/my-roles',
    url: '/edit-my-roles',
    views: {
        'menuContent': {
          templateUrl: 'templates/editMyRoles.html',
          controller: 'editMyRolesCtrl'
        }
      }
  })

  // edit most frequent roles searched
  .state('app.edit-search-roles', {
    // url: '/profile/:userId/edit/search-roles',
    url: '/edit-search-roles',
    views: {
        'menuContent': {
          templateUrl: 'templates/editSearchRoles.html',
          controller: 'editSearchRolesCtrl'
        }
      }
  })

  // start picking with current user
  .state('app.start-picking', {
    // url: '/profile/:userId/start-picking',
    url: '/start-picking',
    views: {
      'menuContent': {
        templateUrl: 'templates/startPicking.html',
        controller: 'startPickingCtrl'
      }
    }
  })

  // see all picks on your account
  .state('app.picks', {
    // url: '/profile/:userId/picks',
    url: '/picks',
    views: {
        'menuContent': {
          templateUrl: 'templates/picks.html',
          controller: 'picksCtrl'
        }
      }
  })

  // app settings page
  // .state('app.settings', {
  //   url: '/settings',
  //   views: {
  //     'menuContent': {
  //       templateUrl: 'views/settings/settings.html',
  //       controller: 'settingsCtrl'
  //     }
  //   }
  // })

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/home');

});
