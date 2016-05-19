angular.module('starter.controllers',[])
.controller('AppCtrl', function($scope, $ionicModal, $timeout, filterFilter) {

  $scope.compare = function(item, itemCompared) {
    if (filterFilter(itemCompared, {
      id: item.id
    }).length > 0 ) {
      item['checked'] = true;
    } else {
      item['checked'] = false;
    }
  }
})//

.controller('homeCtrl', function($scope, $ionicModal, $http, $state) {

  $scope.$on('$ionicView.enter', function(e){
    window.localStorage['id'] = "";
  });
  // Form data for the login modal
  $scope.registerData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/register.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modalOne = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeRegister = function() {
    $scope.modalOne.hide();
  };

  // Open the login modal
  $scope.register = function() {
    $scope.modalOne.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doRegister = function(form){

    var data = { zipcode: form.zip.$modelValue, username: form.username.$modelValue, password: form.password.$modelValue}

    console.log(data);

    $http({url:"http://floating-tor-67033.herokuapp.com/users",
           method: 'POST',
           data: { zipcode: form.zip.$modelValue, username: form.username.$modelValue, password: form.password.$modelValue}}).success(function(response){

      window.localStorage['id'] = response.id;
      $state.go('app.profile');
      $scope.closeRegister();
    }).error(function(error){
      $scope.registrationErrorMsg = "All fields are required";
    })
  };

   // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function(form){
    var data = { username: form.username.$modelValue, password: form.password.$modelValue}
    console.log(data);

    $http({url:"http://floating-tor-67033.herokuapp.com/login",
           method: 'POST',
           data: { username: form.username.$modelValue, password: form.password.$modelValue}}).success(function(response){
      window.localStorage['id'] = response.id;
      $state.go('app.profile');
      $scope.closeLogin();
    }).error(function(error){
      $scope.loginErrorMsg = "Invalid Username / Password Combination";
    })
  };
})

.controller('picksCtrl', function($scope, $http, User, Pick) {
  $scope.$on('$ionicView.enter', function(e){
    var userId = window.localStorage['id'];
    $scope.picks = Pick.query({id: userId});
  });
})//

.controller('profileCtrl', function($scope, $resource, $http, ArtistRole, GenreSelection, User, LoggedInUser) {
  //TO DO: Put in correct variables to get user data from form
  $scope.$on('$ionicView.enter', function(e){
    var userId = window.localStorage['id'];
    $scope.user = User.get({id: userId});
    $scope.roles = ArtistRole.query({id: userId});
    $scope.genres = GenreSelection.query({id: userId});
  });

  $scope.doConnect = function() {
    var userId = window.localStorage['id'];
    window.open(`https://floating-tor-67033.herokuapp.com/soundcloud/connect/${userId}`, '_system')
  };

  $scope.doOpen = function(linkUrl) {
    window.open(linkUrl, '_system')
  };
})//


.controller('editProfileCtrl', function($timeout, $state, $scope, $http, Role, Genre, User, LoggedInUser) {
  $scope.$on('$ionicView.enter', function(e){

    $scope.responseMsg = "";
    var userId = window.localStorage['id'];
    $scope.user = User.get({id: userId});
    $scope.roles = Role.query();
    $scope.genres = Genre.query();

    //When "edit my role" or "edit my searched roles" is clicked
    //route to those forms
    $scope.getEditMyRolesForm = function(){
      // window.localStorage['id'] = response.id;
      $state.go('app.edit-my-roles');
    };//edit

    $scope.getEditSearchedRolesForm = function(){
      // window.localStorage['id'] = response.id;
      $state.go('app.edit-search-roles');
    };//edit searched

    //When "edit my genres" or "edit search genres" is clicked
    //route to those forms
    $scope.getEditMyGenresForm = function(){
      // window.localStorage['id'] = response.id;
      $state.go('app.edit-my-genres');
    };//edit

    $scope.getEditSearchedGenresForm = function(){
      // window.localStorage['id'] = response.id;
      $state.go('app.edit-search-genres');
    };//edit searched

    $scope.doEditProfile = function(form){
      var userId = window.localStorage['id'];
      var edits = {
        username: form.username.$modelValue,
        zipcode: form.zipcode.$modelValue,
        description: form.description.$modelValue
      }

      $scope.isEmpty = function(obj) {
        for(var prop in obj) {
          if (obj[prop] != null) {
            return false;
          }
        }
        return true;
      };

      //only update user if params from form is not empty
      if (!$scope.isEmpty(edits) ) {
        User.update({id: userId}, edits).$promise.then(function(response) {
            $scope.responseMsg = response.status;
            $timeout( function() {}, 2000)
          .then( function() {
            $state.go("app.profile");
          });
        }, function(error) {
            $scope.responseMsg = "Something went wrong. Please retry your changes.";
        });
      }
    };//doEditProfile()
  });//scope.on
})//


.controller('editMyRolesCtrl', function($state, $scope, $http, Role, ArtistRole) {

  var userId = window.localStorage['id'];

  $scope.$on('$ionicView.beforeEnter', function() {
    $scope.roles = Role.query();
    $scope.myRoles = ArtistRole.query({id: userId});
  })

  $scope.$on('$ionicView.enter', function(e){

    $scope.cancelMyRoles = function() {
      $state.go('app.edit-profile');
    }

    for (var role of $scope.roles) {
      $scope.compare(role, $scope.myRoles);
    }

    $scope.saveMyRoles = function(form) {
      $http.delete(`http://floating-tor-67033.herokuapp.com/users/${userId}/roles`)
      .then(function() {
        for (var role of $scope.roles) {
          if (role['checked'] === true) {
            $http.post(`http://floating-tor-67033.herokuapp.com/users/${userId}/roles/${role.id}`,
              {id: role.id} )
            .then( function(response) {
              $state.go('app.edit-profile');
            }, function(response) {
              console.log(response);
            });// $http.post
          }// if
        }// for
      });// $http.delete
    }// $scope.saveMyRoles
  })// ionicView.enter
})//

.controller('editSearchRolesCtrl', function($state, $scope, $http, Role, SearchedRole) { //, filterFilter) {

  var userId = window.localStorage['id'];

  $scope.$on('$ionicView.beforeEnter', function() {
    $scope.roles = Role.query();
    $scope.searchedRoles = SearchedRole.query({id: userId});
  });

  $scope.$on('$ionicView.enter', function(e){

    $scope.cancelSearchedRoles = function() {
      $state.go('app.edit-profile');
    }

    for (var role of $scope.roles) {
      $scope.compare(role, $scope.searchedRoles);
    }

    $scope.saveSearchedRoles = function(form) {
      $http.delete(`http://floating-tor-67033.herokuapp.com/users/${userId}/searched_roles`)
      .then( function() {
        for (var role of $scope.roles) {
          if (role.checked === true) {
            $http.post(`http://floating-tor-67033.herokuapp.com/users/${userId}/searched_roles/${role.id}`,
              {id: role.id} )
            .then( function(response) {
              $state.go('app.edit-profile')
            }, function(response) {
              console.log(response);
            });// $http.post
          }// if
        }// for
      });// $http.delete
    }// $scope.saveSearchedRoles
  })// ionicView.enter
})//

.controller('editMyGenresCtrl', function($state, $scope, $http, Genre, ArtistGenre) {

  var userId = window.localStorage['id'];

  $scope.$on('$ionicView.beforeEnter', function(e){
    $scope.myGenres = ArtistGenre.query({id: userId});
    $scope.genres = Genre.query();
  });

  $scope.$on('$ionicView.enter', function(e){

    $scope.cancelMyGenres = function() {
      $state.go('app.edit-profile');
    }

    for (var genre of $scope.genres) {
      $scope.compare(genre, $scope.myGenres);
    }

    $scope.saveMyGenres = function(form) {
      $http.delete(`http://floating-tor-67033.herokuapp.com/users/${userId}/genres`)
      .then( function() {
        for (var genre of $scope.genres) {
          if (genre.checked === true) {
            $http.post(`http://floating-tor-67033.herokuapp.com/users/${userId}/genres/${genre.id}`,
              {id: genre.id} )
            .then(function successCallBack(response) {
              $state.go('app.edit-profile');
            }, function errorCallBack(response) {
              console.log(response);
            });// $http.post
          }// if
        }// for
      });// $http.delete
    }// $scope.saveMyGenres
  })// ionicView.enter
})//



.controller('CardsCtrl', function($state, $scope, $http, $ionicLoading, $ionicSideMenuDelegate, TDCardDelegate, SearchRole, ArtistRole, $timeout) {

  // function CardUser(user, roles) {
  //   this.user = user;
  //   this.roles = roles;
  // };

  var userId = window.localStorage['id'];
  // var cardTypes = {};
  // var i;
  // var cardUsers = [];
  // $scope.cardRoles = cardUsers;
  $scope.$on('$ionicView.enter', function(e){
    // i = 0;
    console.log('CARDS CTRL');
    $ionicSideMenuDelegate.canDragContent(false);
    $ionicLoading.show();


    $timeout(function(){
      SearchRole.query({id: userId}).$promise.then(function(response){
        cardTypes = response;
        // console.log(cardTypes);
      }, function(response) {
        console.log(response);
        console.log(response.status);
      });
    });

    // $timeout(function(){
    //   // assign roles to each card
    //   $timeout(function(){
    //     for(i; i < cardTypes.length-2; i++){
    //       ArtistRole.query({id: cardTypes[i].id}).$promise.then(function(response){
    //         cardUsers.push(new CardUser(cardTypes[i].username, response));
    //         console.log(response);
    //       }, function(response){
    //         console.log(response);
    //       });
    //     };
    //   }, 100);
    // }, 2000);

    $timeout(function(){
      $ionicLoading.hide();
      $scope.cards = {
        master: cardTypes,
        active: cardTypes,
        discards: [],
        liked: [],
        disliked: []
      };
      console.log($scope.cards)
    }, 2000);
//

    // $scope.usersMatch = function(roleUser, cardUser){
    //   return roleUser === cardUser
    // }

    $scope.cardDestroyed = function(index) {
      $scope.cards.active.splice(index, 1);
    }

    $scope.addCard = function() {
      var newCard = cardTypes[0];
      $scope.cards.active.push(angular.extend({}, newCard));
    }

    $scope.refreshCards = function() {
      // Set $scope.cards to null so that directive reloads
      $scope.cards.active = null;
      $state.go($state.current, {}, {reload: true});
    }

    $scope.$on('removeCard', function(event, element, card) {
      var discarded = $scope.cards.master.splice($scope.cards.master.indexOf(card), 1);
      $scope.cards.discards.push(discarded);
    });

    $scope.cardSwipedLeft = function(id, index) {
      console.log('LEFT SWIPE');
      console.log(id);
      var card = $scope.cards.active[index];
      $scope.cards.disliked.push(card);
    }

    $scope.cardSwipedRight = function(id, index) {
      console.log('RIGHT SWIPE');
      console.log(id);
      console.log(userId);
      var card = $scope.cards.active[index];
      $scope.cards.liked.push(card);
      $http({url:`http://floating-tor-67033.herokuapp.com/users/${userId}/pickings/${id}`,
         method: 'post'
      });
    }

    $scope.doOpen = function(linkUrl) {
      window.open(linkUrl, '_system')
    }
  })
})

.controller('CardCtrl', function($scope, TDCardDelegate) {

});
