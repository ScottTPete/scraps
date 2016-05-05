angular.module('scrapsApp')
	.service('authSvc', function($http, $q) {


	var baseUrl = 'http://localhost:8080';

	this.authenticateUser = function(username, password) {
		console.log('hit svc ' + username + ' ' + password)
		$http.post(baseUrl + '/auth/login', {username: username, password: password});
	}


})
