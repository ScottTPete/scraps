angular.module('scrapsApp')
	.controller('authCtrl', function ($scope, currentUser, $state) {

		$scope.currentUser = currentUser;

		if (!$scope.currentUser && $state.includes('login') || $state.includes('register')) {
			$scope.loginBtn = true;;
			$scope.signUpBtn = true;
		}

		if ($scope.currentUser) {
			$scope.profileLink = true;
			$scope.logoutBtn = true;
		}




	})
