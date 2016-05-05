angular.module('scrapsApp')
	.service('authSvc', function($http, $q) {


	this.authenticateUser = function(username, password) {
		console.log('hit svc ' + username + ' ' + password)
		$http.get('/auth/login',{username: username, password: password});
	}


})
