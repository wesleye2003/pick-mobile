angular.module('starter.services',['ngResource'])
//factory example using resources
.factory('User', function($resource, $http) {
   var data = $resource('http://floating-tor-67033.herokuapp.com/users/:id', {id: "@id"},{
    update: {
      method: "PUT"
    }
   });
   return data;
})

//send post to login route, which will return a user object
.factory('LoggedInUser', function($resource, $http) {
   return $resource('http://floating-tor-67033.herokuapp.com/login/:id', {id: "@id"});
})

.factory('Pick', function($resource, $http) {
   return $resource('http://floating-tor-67033.herokuapp.com/users/:id/pickings', {id: "@id"});
})

.factory('Role', function($resource, $http) {
    return $resource('http://floating-tor-67033.herokuapp.com/roles/:id', {id: "@id"});
})

.factory('Genre', function($resource, $http){
  return $resource('http://floating-tor-67033.herokuapp.com/genres/:id', {id: "@id"});
})

.factory('ArtistRole', function($resource, $http) {
  return $resource('http://floating-tor-67033.herokuapp.com/users/:id/roles', {id: "@id"});
})
//added this code to match ArtistRole, we will need it for profile
.factory('GenreSelection', function($resource, $http) {
  return $resource('http://floating-tor-67033.herokuapp.com/users/:id/genres', {id: "@id"});
})

.factory('SearchRole', function($resource, $http) {
  return $resource('http://floating-tor-67033.herokuapp.com/searched_roles/:id/users', {id: "@id"});
})

.factory('SearchedRole', function($resource, $http) {
  return $resource('http://floating-tor-67033.herokuapp.com/users/:id/searched_roles', {id: "@id"});
})

.factory('ArtistGenre', function($resource, $http) {
  return $resource('http://floating-tor-67033.herokuapp.com/users/:id/genres', {id: "@id"});
})

.factory('SearchGenre', function($resource, $http) {
  return $resource('http://floating-tor-67033.herokuapp.com/users/:id/searched_genres', {id: "@id"});
})

.service('BlankService', [function(){
}]);
