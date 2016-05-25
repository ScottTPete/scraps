angular.module('scrapsApp')
	.service('followingSvc', function ($http) {

		this.getFollowingPosts = function () {
			return $http.get('/api/v1/following').then(function (response) {
				var followingUsers = response.data.following;
				var post;
				var postsArr = [];

				function getPosts(followingArr) {
					for (var i = 0; i < followingArr.length; i++) {
						if (followingArr[i].photos.length >= 1) {
							for (var j = 0; j < followingArr[i].photos.length; j++) {
								var photo = followingArr[i].photos[j];

								post = {
									username: followingArr[i].username
									, profilePic: followingArr[i].profilePic
									, image: photo.image
									, createdAt: photo.createdAt
									, description: photo.description
									, likes: photo.likes
									, photoId: photo._id
								, }
								postsArr.push(post)
							}

						}
					}

					return postsArr;
				}

				var posts = getPosts(followingUsers);

				return posts;
			})





		}







	})
