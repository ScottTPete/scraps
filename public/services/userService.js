angular.module('scrapsApp')
	.service('userSvc', function($http) {

		this.getUserInfo = function(username) {
			return $http.get('/api/v1/user/' + username).then(function(response) {
				console.log(response.data);
				return response.data
			})
		}


})
