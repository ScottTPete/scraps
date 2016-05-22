angular.module('scrapsApp')
	.controller('homeCtrl', function ($scope, currentUser) {

		$scope.currentUser = currentUser;


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
