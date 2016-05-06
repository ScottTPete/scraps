angular.module('scrapsApp')
	.service('authSvc', function($http, $q) {


	var baseUrl = 'http://localhost:8080';

	/*this.authenticateUser = function(username, password) {
		return $http.post(baseUrl + '/auth/login', {username: username, password: password}).then(function(response) {
			console.log(response);
			return response.data;
		})
	};*/


})
