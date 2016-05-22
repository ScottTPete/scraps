angular.module('scrapsApp')
	.controller('followingCtrl', function ($scope, getFollowingPosts, currentUser) {

		$scope.currentUser = currentUser;
		$scope.posts = getFollowingPosts;

		console.log($scope.posts);



		$scope.profileLink = true;
		$scope.logoutBtn = true;
		$scope.followingLink = true;







	})
