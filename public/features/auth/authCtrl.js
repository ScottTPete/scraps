angular.module('scrapsApp')
	.controller('authCtrl', function($scope, $location, authSvc) {


		//Call authSvc, authenticate user function passing in username and password//
		/*$scope.authenticate = function(username, password) {

			authSvc.authenticateUser(username, password).then(function(response) {
				console.log(response)
				var path = response.redirectPath;
				$location.path(path)
			});
		};*/

/*	$scope.userCredentials = {
		username: '',
		password: ''

	}*/

	$scope.getCurrentUser = function() {authSvc.getCurrentUser().then(function(response){$scope.currentUser = response})}

})
