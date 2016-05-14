angular.module('scrapsApp')
	.controller('userCtrl', function ($scope, currentUser, $stateParams, userInfo) {

		$scope.currentUser = currentUser;

		$scope.loginBtn = true;
		if($scope.currentUser) {
			$scope.loginBtn = false;
			$scope.logoutBtn = true;
			$scope.profileLink = true;
        }

		$scope.editButton = false;
		if ($stateParams.username === $scope.currentUser.username) {
			$scope.editButton = true;
			$scope.uploadProfilePicBtn = true;
			$scope.uploadPhotoBtn = true;
		}

		$scope.userInfo = userInfo;
		var userInfo = $scope.userInfo;

		$scope.newPhoto = {};

		if(userInfo.photos.length >= 1) {
			$scope.userPhotos = true;
		}

		$scope.photos = $scope.userInfo.photos;

	})
