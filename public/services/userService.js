angular.module('scrapsApp')
	.service('userSvc', function ($http) {

		this.getUserInfo = function (username) {
			return $http.get('/api/v1/users?username=' + username).then(function (response) {

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

		this.getUsersForSearch = function () {
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
		};

		this.followUser = function (currentUserId, userToFollowId) {
			console.log(currentUserId, userToFollowId);
			$http.put('/api/v1/user/' + currentUserId + '/following', {
				userToFollow: userToFollowId
				, currentUserId: currentUserId
			});
		}


	})
