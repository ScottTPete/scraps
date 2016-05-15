angular.module('scrapsApp')
	.controller('userCtrl', function ($scope, currentUser, $stateParams, userInfo, postSvc) {

		$scope.currentUser = currentUser;

		$scope.loginBtn = true;
		$scope.signUpBtn = true;
		if($scope.currentUser) {
			$scope.loginBtn = false;
			$scope.signUpBtn = false;
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

		$scope.photos = $scope.userInfo.photos;

		$scope.editedPhoto = {};

		$scope.editPhoto = function(photo) {
			console.log(photo);
			postSvc.editPhoto(photo);
		}

	})
