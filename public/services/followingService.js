angular.module('scrapsApp')
	.service('followingSvc', function ($http) {

		this.getFollowingPosts = function () {
			return $http.get('/api/v1/following').then(function (response) {

				var following = response.data.following;
				console.log(following);
				var followingInfo = {};
				var followingPosts = [];

				for (var i = 0; i < following.length; i++) {
					followingInfo = following[i];

					followingInfo.username = following[i].username;
					followingInfo.profilePic = following[i].profilePic;
					followingInfo.photos = following[i].photos;


					followingPosts.push(followingInfo);
				}

				console.log(followingPosts);
				return followingPosts;

			})

		}





	})
