angular.module('scrapsApp')
	.service('userSvc', function ($http) {

		this.getUserInfo = function (username) {
			return $http.get('/api/v1/users?username=' + username).then(function (response) {
				//reverse the array so we get the latest photos first.
				response.data[0].photos

				return response.data[0]
			})
		};

		this.getUsersPhotos = function (username) {
			return $http.get('/api/v1/users?username=' + username).then(function (response) {
				var userPhotos = response.data[0].photos.reverse();

				return userPhotos;
			})
		}

		this.editProfile = function (user) {
			$http.put('/api/v1/user/' + user._id, user);
		};

		this.getUsers = function () {
			return $http.get('/api/v1/users').then(function (response) {
				var searchUsers = [];
				response.data.forEach(function (user) {

					var searchInfo = {
						name: user.name
						, username: user.username
						, profilePic: user.profilePic
					};
					user = searchInfo
					searchUsers.push(user);
				})

				return searchUsers;
			})
		}


	})