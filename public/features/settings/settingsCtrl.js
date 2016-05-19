angular.module('scrapsApp')
	.controller('settingsCtrl', function ($scope, currentUser, userSvc) {

		$scope.profileLink = true;

		$scope.currentUser = currentUser;
		console.log($scope.currentUser);

		$scope.editProfile = function () {
			console.log($scope.user);
			userSvc.editProfile($scope.currentUser); //pass in the user to userSvc editProfile func.

			getUserInfo($scope.currentUser.username); //call getUserInfo to update scope with new the new userInfo.
		};

		function getUserInfo(username) {
			userSvc.getUserInfo(username).then(function (response) {
				$scope.currentUser = response; //gets current user details and puts userInfo on scope.
			})
		};



	})