angular.module('scrapsApp')
	.controller('loginCtrl', function($scope, $location, authSvc) {


		//Call authSvc, authenticate user function passing in username and password//
		$scope.authenticate = function(username, password) {

			authSvc.authenticateUser(username, password).then(function(response) {
				console.log(response);
				var path = response.redirectPath;
				$location.path(path)
			});
		};

})
