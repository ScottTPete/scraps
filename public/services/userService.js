angular.module('scrapsApp')
	.service('userSvc', function ($http) {

		this.getUserInfo = function (username) {
			return $http.get('/api/v1/user/' + username).then(function (response) {
				return response.data
			})
		};

		this.editProfile = function(user) {
			$http.put('/api/v1/user/' + user._id, user);
		}


	})
