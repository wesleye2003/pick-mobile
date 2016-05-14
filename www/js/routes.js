angular.module('starter', ['ionic', 'ionic.contrib.ui.tinderCards'])
.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/sideMenu.html',
    controller: 'AppCtrl'
  })
  .state('app.start-picking', {
      url: '/start-picking',
      views: {
        'menuContent': {
          templateUrl: 'templates/startPicking.html',
          controller: 'profileCtrl'
        }
      }
    })
  .state('app.edit-profile', {
        url: '/edit-profile',
        views: {
          'menuContent': {
            templateUrl: 'templates/editProfile.html',
            controller: 'editProfileCtrl'
          }
        }
      });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/start-picking');
});
