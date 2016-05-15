angular.module('scrapsApp')
	.service('userSvc', function ($http) {

		this.checkUsernameExists = function (username) {
			return $http.get('/api/v1/user/' + username).then(function (response) {
				return response
			})
		};

		this.getUserInfo = function (username) {
			return $http.get('/api/v1/users?username=' + username).then(function (response) {
				console.log(response.data[0]);

				//reverse the array so we get the latest photos first.
				response.data[0].photos.reverse();

				return response.data[0]
			})
		};

		this.editProfile = function (user) {
			console.log(user);
			$http.put('/api/v1/user/' + user._id, user);
		};


	})
