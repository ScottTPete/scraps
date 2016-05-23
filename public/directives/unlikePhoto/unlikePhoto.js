angular.module('scrapsApp')
	.directive('unlikePhoto', function (postSvc, userSvc, $state) {
		return {
			restrict: 'A'
			, link: function (scope, elem, attrs) {

				elem.on('click', function () {
					postSvc.unlikePhoto(scope.photo._id)

					scope.like = true;
					scope.liked = false;
					userSvc.getUserInfo(scope.userInfo.username).then(function (response) {
						scope.userInfo = response;
						$state.go($state.current, {}, {
							reload: true
						});

					})
				})
			}
		}

	});
