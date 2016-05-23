angular.module('scrapsApp')
	.directive('unlikeFollowingPhoto', function (postSvc, followingSvc, $state) {
		return {
			restrict: 'A'
			, link: function (scope, elem, attrs) {

				elem.on('click', function () {
					postSvc.unlikePhoto(scope.post.photo._id)

					scope.like = true;
					scope.liked = false;
					followingSvc.getFollowingPosts().then(function (response) {
						scope.posts = response;
						$state.go($state.current, {}, {
							reload: true
						});

					})
				})
			}
		}

	});
