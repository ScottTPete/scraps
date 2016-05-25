angular.module('scrapsApp')
	.controller('followingCtrl', function ($scope, getFollowingPosts, currentUser, Lightbox) {

		$scope.currentUser = currentUser;
		$scope.posts = getFollowingPosts.sort(function (a, b) {
			var c = new Date(a.createdAt);
			var d = new Date(b.createdAt);
			return d - c;
		})

		console.log($scope.posts);



		$scope.profileLink = true;
		$scope.logoutBtn = true;
		$scope.followingLink = true;
		$scope.like = true;



		$scope.openLightboxModal = function (index) {
			Lightbox.openModal($scope.posts, index);
		};




	})
