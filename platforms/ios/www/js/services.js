angular.module('starter.services',['ngResource'])
//factory example using resources
.factory('Role', function($resource, $http) {
    return $resource('http://localhost:3000/roles/:id', {id: "@id"});
})
.service('BlankService', [function(){
}]);
