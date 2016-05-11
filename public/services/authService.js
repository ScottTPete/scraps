angular.module('scrapsApp')
	.service('authSvc', function($http, $q) {

	this.getCurrentUser = function() {
		return $http.get('/auth/currentUser').then(function(response, err) {
			console.log(err);
			var errMessage = 'Users must be logged on to edit their account.'
			if(!response.data) {
				throw err
			}
			return response.data
		})
	};

	this.checkUsernameExists = function(username) {
		return $http.get('/api/v1/user/' + username).then(function(response) {
			return response
		})
	};


})
