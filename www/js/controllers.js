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

  $scope.$on('$ionicView.enter', function(e){
    window.localStorage['id'] = ""
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

    $http({url:"http://localhost:3000/users",
           method: 'POST',
           data: { zipcode: form.zip.$modelValue, username: form.username.$modelValue, password: form.password.$modelValue}}).success(function(response){

      window.localStorage['id'] = response.id;
      $state.go('app.profile');
      $scope.closeRegister();
    }).error(function(errorData){
      console.log(errorData);
    })
    // window.localStorage['user_id'] = "1"
    // console.log('an attempt was made.')
    // $http.get(`http://localhost:3000/users/${window.localStorage['user_id']}`).then(function(response){
    //   console.log(response.data.id)
    // })
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

    $http.post("http://localhost:3000/login",
      { username: form.username.$modelValue, password: form.password.$modelValue}
      ).then( function(response) {
        window.localStorage['id'] = response.id;
        $state.go('app.profile');
        $scope.closeLogin();
      }, function(errorData) {
        console.log(errorData);
      })
    // $http({url:"http://localhost:3000/login",
    //        method: 'POST',
    //        data: { username: form.username.$modelValue, password: form.password.$modelValue}}).success(function(response){
    //   window.localStorage['id'] = response.id;
    //   $state.go('app.profile');
    //   $scope.closeLogin();
    // }).error(function(errorData){
    //   console.log(errorData);
    // })
    // window.localStorage['user_id'] = "1"
    // console.log('an attempt was made.')
    // $http.get(`http://localhost:3000/users/${window.localStorage['user_id']}`).then(function(response){
    //   console.log(response.data.id)
    // })
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
    //in following line, changed to GenreSelection and added user id
    $scope.genres = GenreSelection.query({id: userId});
    // console.log($scope.roles);
  });

  $scope.doConnect = function() {
    var userId = window.localStorage['id'];
    window.open(`https://localhost:3000/soundcloud/connect/${userId}`, '_system')
  };

  $scope.doOpen = function(linkUrl) {
    window.open(linkUrl, '_system')
  };
})//


.controller('editProfileCtrl', function($state, $scope, $http, Role, Genre, User, LoggedInUser) {
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
      var edits = { username: form.username.$modelValue, zipcode: form.zipcode.$modelValue, description: form.description.$modelValue}
      console.log(edits);

      var userId = window.localStorage['id'];

     User.update({id: userId}, edits)
        .$promise.then(function(response){
          // console.log(response.status);
          $scope.responseMsg = response.status;
        }, function(error){
            $scope.responseMsg = error.status;
        });

      //when user leaves edit-profile view, reset form
      //  $scope.$on("$destroy", function(){
      //   // $state.go("app.edit-profile", {}, {reload:true});
      //   $ionicHistory.clearCache();
      //   $scope.responseMsg = "";
      //   // .then(function(){ $state.go('app.fooState') });
      // });
    };//doEditProfile()
  });//scope.on
})//


.controller('editMyRolesCtrl', function($state, $scope, $http, Role, ArtistRole) { //, filterFilter) {

  // $scope.compare = function(role) {
  //   if (filterFilter($scope.myRoles, {
  //     id: role.id
  //   }).length > 0 ) {
  //     return true;
  //   }
  // }
  $scope.$on('$ionicView.enter', function(e){
    var userId = window.localStorage['id'];
    // $scope.myRoles = ArtistRole.query({id: userId});
    // console.log($scope.myRoles);
    $scope.roles = Role.query();
    console.log($scope.roles);

    $scope.cancelMyRoles = function() {
      $state.go('app.edit-profile');
    }

    $scope.saveMyRoles = function(form) {
      // $http({url:`http://localhost:3000/users/${userId}/roles`,
      //          method: 'delete'
      //        })
      $http.delete(`http://localhost:3000/users/${userId}/roles`);
      var saveData = {};
      for (var role of $scope.roles) {
        if (role.checked === true) {

          $http.post(`http://localhost:3000/users/${userId}/roles/${role.id}`,
            {id: role.id}
          ).then( function(response) {
              $state.go('app.edit-profile');
            }, function(response) {
              console.log(response);
          });
        }

          // $http({url:`http://localhost:3000/users/${userId}/roles`,
          //        method: 'POST',
          //        data: role.id
          //      }).success(function(response){
          //   $state.go('app.edit-profile');
          // }).error(function(errorData){
          //   // console.log(errorData);
          // })
        // }
      }
    }
  })
})//

.controller('editSearchRolesCtrl', function($state, $scope, $http, Role, SearchRole) { //, filterFilter) {

  // $scope.compare = function(role) {
  //   if (filterFilter($scope.searchRoles, {
  //     id: role.id
  //   }).length > 0 ) {
  //     return true
  //   }
  // }

  $scope.$on('$ionicView.enter', function(e){
    var userId = window.localStorage['id'];
    // $scope.myRoles = SearchRole.query({id: userId});
    // console.log($scope.myRoles);
    $scope.roles = Role.query();

    $scope.cancelSearchedRoles = function() {
      $state.go('app.edit-profile');
    }

    $scope.saveSearchedRoles = function(form) {
      // $http({url:`http://localhost:3000/users/${userId}/searched_roles`,
      //          method: 'delete'
      //        })
      $http.delete(`http://localhost:3000/users/${userId}/searched_roles`);
      var saveData = {};
      for (var role of $scope.roles) {
        if (role.checked === true) {

          $http.post(`http://localhost:3000/users/${userId}/searched_roles/${role.id}`,
            {id: role.id}
          ).then( function(response) {
              $state.go('app.edit-profile')
            }, function(response) {
              console.log(response);
          });
        }
          // $http({url:`http://localhost:3000/users/${userId}/searched_roles/${role.id}`,
          //        method: 'POST',
          //        data: role.id
          //      }).success(function(response){
          //   $state.go('app.edit-profile');
          // }).error(function(errorData){
          //   // console.log(errorData);
          // })
        // }
      }
    }
  })
})//

.controller('editMyGenresCtrl', function($state, $scope, $http, Genre, ArtistGenre) {
  $scope.$on('$ionicView.enter', function(e){
    var userId = window.localStorage['id'];
    $scope.myGenres = ArtistGenre.query({id: userId});
    $scope.genres = Genre.query();

    $scope.cancelMyGenres = function() {
      $state.go('app.edit-profile');
    }

    $scope.saveMyGenres = function(form) {
      // $http({url:`http://localhost:3000/users/${userId}/genres`,
      //          method: 'delete'
      //        })
      $http.delete(`http://localhost:3000/users/${userId}/genres`);
      var saveData = {};
      for (var genre of $scope.genres) {
        if (genre.checked === true) {

          $http.post(`http://localhost:3000/users/${userId}/genres/${genre.id}`,
            saveData
            ).then(function successCallBack(response) {
              $state.go('app.edit-profile');
            }, function errorCallBack(response) {
              console.log(response);
            });
        }
          // $http({url:`http://localhost:3000/users/${userId}/genres/${role.id}`,
          //        method: 'POST',
          //        data: role.id
          //      }).success(function(response){
          //   $state.go('app.edit-profile');
          //   // $scope.closeRegister();
          // }).error(function(errorData){
          //   // console.log(errorData);
          // })
      }
    }
  })
})//

.controller('editSearchGenresCtrl', function($state, $scope, $http, Genre, SearchGenre) {
  $scope.$on('$ionicView.enter', function(e){
    var userId = window.localStorage['id'];
    $scope.searchGenres = SearchGenre.query({id: userId});
    $scope.genres = Genre.query();

    $scope.cancelSearchedGenres = function() {
      $state.go('app.edit-profile');
    }

    $scope.saveSearchedGenres = function(form) {
      // $http({url:`http://localhost:3000/users/${userId}/searched_genres`,
      //          method: 'delete'
      //        })
      $http.delete(`http://localhost:3000/users/${userId}/searched_genres`);
      var saveData = {};
      for (var genre of $scope.genres) {
        if (genre.checked === true) {

          $http.post(`http://localhost:3000/users/${userId}/searched_genres/${role.id}`,
            {id: role.id}
          ).then( function(response) {
              $state.go('app.edit-profile')
            }, function(response) {
              console.log(response);
          });
        }

        //   $http({url:`http://localhost:3000/users/${userId}/searched_genres/${role.id}`,
        //          method: 'PUT'
        //        }).success(function(response){
        //     $state.go('app.edit-profile');
        //     // $scope.closeRegister();
        //   }).error(function(errorData){
        //     // console.log(errorData);
        //   })
        // }
      }
    }
  })
})//

.controller('startPickingCtrl', function($scope) {

})//

//factory example using resources
.controller('rolesCtrl', function($scope, Role) {

})//

//Cards Controller - Start Picking
.controller('CardsCtrl', function ($scope, $http, $ionicLoading, $ionicSideMenuDelegate, TDCardDelegate, SearchRole) {
  var userId = window.localStorage['id'];
  $scope.$on('$ionicView.enter', function(e){
    console.log('CARDS CTRL');
    $ionicSideMenuDelegate.canDragContent(false);


    $scope.cards = SearchRole.query({id: userId});
    console.log($scope.cards);
    // console.log($scope.cards["0"].username);
    // //get the 1st role for the user on the card
    // $scope.roles = ArtistRole.query({id: userId});
    // //get the users genres
    // $scope.genres = GenreSelection.query({id: userId});


    $scope.cardDestroyed = function(index) {
      $scope.cards.splice(index, 1);
    };

    $scope.toggleLeft = function() {
    $ionicSideMenuDelegate.toggleLeft();
    };

    })
    $scope.cardSwipedLeft = function(index) {
      console.log('LEFT SWIPE');
      console.log(index)
      console.log(userId)
    };
    $scope.cardSwipedRight = function(index) {
      console.log('RIGHT SWIPE');
      console.log(index)
      console.log(userId)
      $http({url:`http://localhost:3000/users/${userId}/pickings/${index}`,
         method: 'post'
       });
    };
})//


.controller('CardCtrl', function($scope, TDCardDelegate) {

})//
