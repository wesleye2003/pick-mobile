angular.module('starter.controllers',[])
.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});


})//

.controller('homeCtrl', function($scope, $ionicModal, $http, $state) {
  // Form data for the login modal
  $scope.registerData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/register.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeRegister = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.register = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doRegister = function(form){

    var data = { username: form.username.$modelValue, password: form.password.$modelValue}
    console.log(data);
    //post new user to /users path
    //this http request accesses the /users directly, rather than using the factory in services.js
    //user object is returned as response in json format
    $http({url:"http://floating-tor-67033.herokuapp.com/users",
           method: 'POST',
           data: { username: form.username.$modelValue, password: form.password.$modelValue}}).success(function(response){
      window.localStorage['id'] = response.id;
      $state.go('app.profile');
    }).error(function(errorData){
      console.log(errorData);
    })
    // window.localStorage['user_id'] = "1"
    // console.log('an attempt was made.')
    // $http.get(`http://localhost:3000/users/${window.localStorage['user_id']}`).then(function(response){
    //   console.log(response.data.id)
    // })
  };


})

.controller('picksCtrl', function($scope) {

  $scope.$on("$ionicSlides.sliderInitialized", function(event, data){
    // data.slider is the instance of Swiper
    $scope.slider = data.slider;
  });

  $scope.$on("$ionicSlides.slideChangeStart", function(event, data){
    console.log('Slide change is beginning');
  });

  $scope.$on("$ionicSlides.slideChangeEnd", function(event, data){
    // note: the indexes are 0-based
    $scope.activeIndex = data.activeIndex;
    $scope.previousIndex = data.previousIndex;
  });
})//

.controller('registerCtrl', function($scope) {

})//

//pass needed factories, scope, and localStorage as arguments to be accessed in the controller  var userId = window.localStorage['id'];
.controller('profileCtrl', function($scope, $http, Role, Genre, User, LoggedInUser) {
   //set scope properties so the variables can be accessed in the templates associated with
  //this controller in the state, see routes.js
  $scope.user = User.get({id: userId});
  // console.log($scope.user);
  $scope.roles = Role.query();
  $scope.genres = Genre.query();
  // console.log($scope.roles);
  //now user, roles and genres can be accessed in profile.html
})//


.controller('editProfileCtrl', function($scope) {

})//


.controller('editMyRolesCtrl', function($scope) {

})//

.controller('editSearchRolesCtrl', function($scope) {

})

.controller('startPickingCtrl', function($scope) {

})//

.controller('picksCtrl', function($scope) {

})//

//factory example using resources
.controller('rolesCtrl', function($scope, Role) {
  //get all roles
  // $scope.roles = Role.query();
  // console.log($scope.roles);
  // //get one roll
  // $scope.role = Role.query({id: 1});
  // console.log($scope.role);
})//

//Cards Controller - Start Picking
.controller('CardsCtrl', function ($scope, $http, $ionicLoading, $ionicSideMenuDelegate, TDCardDelegate) {
  console.log('CARDS CTRL');
  $ionicSideMenuDelegate.canDragContent(false);
  var cardTypes = [];
  $ionicLoading.show();
  $http.get('https://randomuser.me/api/?results=5').success(function (response) {
      angular.forEach(response.results, function (famous) {
        cardTypes.push(famous);
        //console.log(JSON.stringify(famous));
      });
      $ionicLoading.hide();
    }).error(function (err) {
      console.log(err);
    });

  //$scope.cards = Array.prototype.slice.call(cardTypes, 0);
  $scope.cards = cardTypes;
  $scope.cardDestroyed = function(index) {
    $scope.cards.splice(index, 1);
  };

  $scope.addCard = function() {
    var newCard = cardTypes[Math.floor(Math.random() * cardTypes.length)];
    newCard.id = Math.random();
    $scope.cards.push(angular.extend({}, newCard));
  }

  $scope.yesCard = function() {
    console.log('YES');
    $scope.addCard();
  };

  $scope.noCard = function() {
    console.log('NO');
    $scope.addCard();
  };
  $scope.toggleLeft = function() {
  $ionicSideMenuDelegate.toggleLeft();
  };
})//


.controller('CardCtrl', function($scope, TDCardDelegate) {
  $scope.cardSwipedLeft = function(index) {
    console.log('LEFT SWIPE');
    $scope.addCard();
  };
  $scope.cardSwipedRight = function(index) {
    console.log('RIGHT SWIPE');
    $scope.addCard();
  };
})//

