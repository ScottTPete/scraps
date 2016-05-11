angular.module('scrapsApp')
	.controller('userCtrl', function ($scope, currentUser, $stateParams, userInfo) {

		$scope.currentUser = currentUser;

		console.log($scope.currentUser);

		$scope.editButton = false;

		if($stateParams.username === $scope.currentUser.username) {
			$scope.editButton = true;
		}

		$scope.userInfo = userInfo

		console.log($scope.userInfo);

	})
