angular.module('scrapsApp')
	.directive('likePhoto', function (postSvc, userSvc, $state) {
		return {
			restrict: 'A'
			, link: function (scope, elem, attrs) {

				elem.on('click', function () {
					if (!scope.currentUser) {
						$state.go('login')
					} else {
						postSvc.likePhoto(scope.photo._id)

						this.like = false;
						this.liked = true;
						userSvc.getUserInfo(scope.userInfo.username).then(function (response) {
							scope.userInfo = response;
							$state.go($state.current, {}, {
								reload: true
							});

						})
					}
				})
			}
		}

	});
