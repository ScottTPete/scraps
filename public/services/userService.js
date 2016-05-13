angular.module('scrapsApp')
	.service('userSvc', function ($http) {

		this.checkUsernameExists = function (username) {
			return $http.get('/api/v1/user/' + username).then(function (response) {
				return response
			})
		};

		this.getUserInfo = function (username) {
			return $http.get('/api/v1/users?username=' + username).then(function (response) {
				return response.data[0]
			})
		};

		this.editProfile = function (user) {
			$http.put('/api/v1/user/' + user._id, user);
		};


	})
