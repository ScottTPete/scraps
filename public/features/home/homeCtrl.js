angular.module('scrapsApp')
	.controller('homeCtrl', function ($scope, currentUser, photosForCollage) {

		$scope.currentUser = currentUser;
		$scope.photos = photosForCollage;


		$scope.loginBtn = true;
		$scope.signUpBtn = true;


		if ($scope.currentUser) {
			$scope.loginBtn = false;
			$scope.logoutBtn = true;
			$scope.signUpBtn = false;
			$scope.profileLink = true;
			$scope.followingLink = true;
		}




	})
