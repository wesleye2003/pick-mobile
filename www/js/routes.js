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
  .state('app.settings', {
        url: '/settings',
        views: {
          'menuContent': {
            templateUrl: 'views/settings/settings.html',
            controller: 'settingsCtrl'
          }
        }
      });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/people');
});
