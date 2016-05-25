angular.module('scrapsApp')
	.directive('likeFollowingPhoto', function (followingSvc, postSvc, $state) {
		return {
			restrict: 'A'
			, link: function (scope, elem, attrs) {

				elem.on('click', function () {

					postSvc.likePhoto(scope.post.photoId)

					scope.like = false;
					scope.liked = true;
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
