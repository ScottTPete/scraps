angular.module('scrapsApp')
	.controller('settingsCtrl', function($scope, currentUser, userSvc) {

		$scope.user = currentUser;

		$scope.editProfile = function() {

			console.log($scope.user);
			userSvc.editProfile($scope.user); //pass in the user to userSvc editProfile func. Don't need to get anything else.

			getUserInfo(); //call getUserInfo to update scope with new the new userInfo.

		};

		function getUserInfo() {
			userSvc.getUserInfo($scope.user.username).then(function(response) {
				$scope.userInfo = response; //gets current user details and puts userInfo on scope.
			})
		};



})
