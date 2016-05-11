angular.module('scrapsApp')
	.service('authSvc', function($http, $q) {

	this.getCurrentUser = function() {
		return $http.get('/auth/currentUser').then(function(response) {
			console.log(response.data);
			return response.data
		})
	};

	this.checkUsernameExists = function(username) {
		return $http.get('/api/v1/user/' + username).then(function(response) {
			return response
		})
	};


})
