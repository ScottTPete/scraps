angular.module('scrapsApp')
	.service('authSvc', function($http, $state) {

	this.getCurrentUser = function() {
		return $http.get('/auth/currentUser').then(function(response) {

			//if response.data is falsey and the route includes account/settings go back to login page as only logged in users can access settings.
			if(!response.data &&  window.location.href.includes('account/settings')) {
				$state.go('login')
			};

			//Was working. Inexplicably broke. I will get it working again.
			/*if(!response.data && state.current.name === 'accountSettings') {
				$state.go('login')
			}*/
			return response.data
		})
	};

	this.checkUsernameExists = function(username) {
		return $http.get('/api/v1/user/' + username).then(function(response) {
			return response
		})
	};


})
