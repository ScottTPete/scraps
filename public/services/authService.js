angular.module('scrapsApp')
	.service('authSvc', function($http, $state) {

	var state  = $state;

	this.getCurrentUser = function() {
		return $http.get('/auth/currentUser').then(function(response) {
			if(!response.data && state.current.name === 'accountSettings') {
				$state.go('login')
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
