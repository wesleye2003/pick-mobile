angular.module('starter.routes', [])
.config(function($stateProvider, $urlRouterProvider, $httpProvider) {
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
    controller: 'homeCtrl'
  })

  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'homeCtrl'
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

