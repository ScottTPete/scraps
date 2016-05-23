angular.module('scrapsApp')
	.directive('checkFollowingLikes', function () {
		return {
			restrict: 'A'
			, link: function (scope, elem, attrs) {

				if (scope.post.photo.likes.indexOf(scope.currentUser._id) != -1) {
					scope.liked = true;
					scope.like = false;
				}
			}
		}

	});
