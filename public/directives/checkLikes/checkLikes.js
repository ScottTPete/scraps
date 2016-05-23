angular.module('scrapsApp')
	.directive('checkLikes', function () {
		return {
			restrict: 'A'
			, link: function (scope, elem, attrs) {

				if (scope.photo.likes.indexOf(scope.currentUser._id) != -1) {
					scope.liked = true;
					scope.like = false;
				}
			}
		}

	});
