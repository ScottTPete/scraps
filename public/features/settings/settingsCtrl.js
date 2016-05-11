angular.module('scrapsApp')
	.controller('settingsCtrl', function($scope, currentUser, userSvc) {

		$scope.user = currentUser;

		$scope.editProfile = function() {
			console.log($scope.user);
			userSvc.editProfile($scope.user).then(function(response){
				console.log(response)
					getUserInfo();
			})
		}

		function getUserInfo() {
			userSvc.getUserInfo($scope.user.username).then(function(response) {
				$scope.userInfo = response;
			})
		};



})
