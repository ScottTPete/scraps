angular.module('scrapsApp')
	.controller('followingCtrl', function ($scope, getFollowing, currentUser) {

		$scope.currentUser = currentUser;
		$scope.following = getFollowing;
		console.log($scope.currentUser);




	})
