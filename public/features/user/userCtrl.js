angular.module('scrapsApp')
	.controller('userCtrl', function ($scope, currentUser, $stateParams, userInfo, postSvc, userSvc, $state) {

		$scope.currentUser = currentUser; //Current user.
		$scope.userInfo = userInfo; //Info of user whose page someone is on.

		$scope.newPhoto = {}; //create an object on scope that is used by the photoUpload directive.
		$scope.photos = $scope.userInfo.photos; //put user photos on scope.
		$scope.photos.reverse();
		$scope.photo = {};
		//All photos like button will be shown by default
		$scope.like = true;
		if (!$scope.currentUser) {
			$scope.like = true;
			$scope.liked = false;
		}

		//By default assume a user will not be on their own page.
		$scope.followBtn = true;
		$scope.editPhotoBtn = false;

		//By default assume there will be no user logged in.
		$scope.loginBtn = true;
		$scope.signUpBtn = true;

		//User stats: posts/followers/following. Show stats by default.
		$scope.postCount = $scope.userInfo.photos.length;
		$scope.followersCount = $scope.userInfo.followers.length;
		$scope.followingCount = $scope.userInfo.following.length;


		//If there is a current user don't show login/sig. Do show a link to your profile and a signout option.
		if ($scope.currentUser) {
			$scope.loginBtn = false;
			$scope.signUpBtn = false;
			$scope.logoutBtn = true;
			$scope.profileLink = true;
			$scope.followingLink = true;
			for (var i = 0; i < currentUser.following.length; i++) {
				if ($scope.currentUser.following[i] === $scope.userInfo._id) {
					$scope.followBtn = false;
					$scope.unfollowBtn = true;
				}
			}
		};

		$scope.fullname = true;
		if (!$scope.userInfo.name) {
			$scope.fullname = false;
		}

		//If the current user is on their own page, these options are accessible.
		if ($stateParams.username === $scope.currentUser.username) {
			$scope.editAccountBtn = true;
			$scope.editPhotoBtn = true;
			$scope.uploadProfilePicBtn = true;
			$scope.uploadPhotoBtn = true;
			$scope.userControls = true
			$scope.followBtn = false;
		};

		if ($scope.currentUser.photos > 0 && $scope.currentUser._id === $scope.photos[0].postedBy._id) {

			$scope.editPhotoBtn = true;
		};

		//Show the edit options when clicked. Hide the editingBtn.
		$scope.editPhotoEnabled = function () {
			this.photoEditOptions = true;
			this.editPhotoBtn = false;
			this.deletePhotoBtn = true;

		};

		//Cancels editing and returns the prior scope.
		$scope.cancelEditingPhoto = function () {
			this.photoEditOptions = !this.photoEditOptions;
			$state.go($state.current, {}, {
				reload: true
			});
		};

		//Updates a photo if user changes details about it.
		$scope.updatePhoto = function (photo, id) {
			postSvc.editPhoto(photo, id);
			$state.go($state.current, {}, {
				reload: true
			});
		};

		//Delete a photo from a user and the database.
		$scope.deletePhoto = function (photoId) {
			postSvc.deletePhoto(photoId);
			$state.go($state.current, {}, {
				reload: true
			});
		};

		$scope.followUser = function () {
			if (!$scope.currentUser) {
				$state.go('login');
			} else {
				userSvc.followUser($scope.currentUser._id, $scope.userInfo._id);

				$scope.unfollowBtn = true;
				$scope.followBtn = false;
				userSvc.getUserInfo($scope.currentUser.username).then(function (response) {
					$scope.currentUser = response;
					$state.go($state.current, {}, {
						reload: true
					});
				})
			}
		};

		$scope.unfollowUser = function () {
			userSvc.unfollowUser($scope.currentUser._id, $scope.userInfo._id);

			$scope.unfollowBtn = false;
			$scope.followBtn = true;
			userSvc.getUserInfo($scope.currentUser.username).then(function (response) {
				$scope.currentUser = response;
				$state.go($state.current, {}, {
					reload: true
				});
			})
		};
	})
