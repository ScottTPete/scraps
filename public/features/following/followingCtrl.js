angular.module('scrapsApp')
	.controller('followingCtrl', function ($scope, getFollowingPosts, currentUser) {

		$scope.currentUser = currentUser;
		$scope.followingPosts = getFollowingPosts;

		console.log($scope.followingPosts);



		$scope.profileLink = true;
		$scope.logoutBtn = true;
		$scope.followingLink = true;







	})
