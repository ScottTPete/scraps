angular.module('scrapsApp')
	.controller('userCtrl', function ($scope, currentUser, $stateParams, userInfo, postSvc, userSvc) {

		$scope.currentUser = currentUser; //Current user.
		$scope.userInfo = userInfo; //Info of user whose page someone is on.

		$scope.newPhoto = {}; //create an object on scope that is used by the photoUpload directive.
		$scope.photos = $scope.userInfo.photos; //put user photos on scope.
		$scope.photo = {};

		//By default assume a user will not be on their own page.
		$scope.photo.photoEditorEnabled = true;

		//By default assume there will be no user logged in.
		$scope.loginBtn = true;
		$scope.signUpBtn = true;

		//Number of posts a user has made. Show the stat by default.
		$scope.postCount = $scope.userInfo.photos.length;
		$scope.postStats = true;

		//If there is a current user don't show login/sig. Do show a link to your profile and a signout option.
		if ($scope.currentUser) {
			$scope.loginBtn = false;
			$scope.signUpBtn = false;
			$scope.logoutBtn = true;
			$scope.profileLink = true;
		};

		//If the current user is on their own page, these options are accessible.
		if ($stateParams.username === currentUser.username) {
			$scope.editAccountBtn = true;
			$scope.photo.photoEditorEnabled = false;
			$scope.uploadProfilePicBtn = true;
			$scope.uploadPhotoBtn = true;
			$scope.deletePhotoBtn = true;
		};

		//If the user has no posts. Don't show the stat.
		if ($scope.postCount < 1) {
			$scope.postStats = false;
		};

		$scope.getPhotos = function () {
			userSvc.getUsersPhotos($scope.currentUser.username).then(function (response) {
				return $scope.photos = response;
			})
		}

		//Show the edit options when clicked. Hide the editingBtn.
		$scope.editPhotoEnabled = function (index) {
			$scope.photo = $scope.photos[index]
			$scope.photo.photoEditOptions = true;
			console.log($scope.photo);
		};

		//Cancels editing and returns the prior scope. Well that's the plan, but it's broken.
		$scope.cancelEditingPhoto = function (index) {
			$scope.photo.photoEditorEnabled = false;
			$scope.photo.photoEditOptions = false;
			$scope.getPhotos();
		};

		//Updates a photo if user changes details about it.
		$scope.updatePhoto = function (photo, id) {
			postSvc.editPhoto(photo, id);
		};

		//Delete a photo from a user and the database.
		$scope.deletePhoto = function (photoId) {
			postSvc.deletePhoto(photoId);
			$scope.getPhotos();
		};

	})
