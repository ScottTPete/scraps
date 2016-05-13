angular.module('scrapsApp')
	.controller('settingsCtrl', function($scope, currentUser, userSvc) {

		$scope.profileLink = true;

		$scope.user = currentUser;

		$scope.editProfile = function() {
			console.log($scope.user);
			userSvc.editProfile($scope.user); //pass in the user to userSvc editProfile func.

			getUserInfo($scope.user.username); //call getUserInfo to update scope with new the new userInfo.
		};

	function getUserInfo(username) {
		userSvc.getUserInfo(username).then(function(response) {
			$scope.user = response; //gets current user details and puts userInfo on scope.
		})
	};



})
