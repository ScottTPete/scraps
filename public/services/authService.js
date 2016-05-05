angular.module('scrapsApp')
	.service('authSvc', function($http, $q) {


	this.authenticateUser = function(user) {
		console.log('hit svc ' + user.username + ' ' + user.password)
		$http.post('/auth/login', {username: user.username, password: user.password});
	}


})
