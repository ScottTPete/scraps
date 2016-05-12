angular.module('scrapsApp')
	.controller('userCtrl', function ($scope, currentUser, $stateParams, userInfo) {

		$scope.currentUser = currentUser;

		$scope.logoutBtn = false
		$scope.loginBtn = true;
		if($scope.currentUser) {
			$scope.loginBtn = false;
			$scope.logoutBtn = true;
        }

		$scope.uploadProfilePicBtn = false;
		$scope.editButton = false;
		if ($stateParams.username === $scope.currentUser.username) {
			$scope.editButton = true;
			$scope.uploadProfilePicBtn = true;
		}

		$scope.userInfo = userInfo;

	})
