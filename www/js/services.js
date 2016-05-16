//Front-end "models", each factory method returns the resource at the path specified
//Can return collection or one
//For collection use FactoryName.query(), for one use FactoryName.get({id: "1"})

angular.module('starter.services',['ngResource'])
//Use this factory to send a get request to the users route
.factory('User', function($resource, $http) {
   return $resource('http://floating-tor-67033.herokuapp.com/users/:id', {id: "@id"});
})

//Will use this factory to send a post request to the login route, which will return a user object
//In the controller, call LoggedInUser.save({id: window.localStorage['id']})
.factory('LoggedInUser', function($resource, $http) {
   return $resource('http://floating-tor-67033.herokuapp.com/login/:id', {id: "@id"});
})

.factory('Role', function($resource, $http) {
    return $resource('http://floating-tor-67033.herokuapp.com/roles/:id', {id: "@id"});
})

.factory('Genre', function($resource, $http){
  return $resource('http://floating-tor-67033.herokuapp.com/genres/:id', {id: "@id"});
})

.service('BlankService', [function(){
}]);
