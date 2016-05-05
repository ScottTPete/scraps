angular.module('scrapsApp')
	.controller('loginCtrl', function($scope, $location, authSvc) {


		//Call authSvc, authenticate user function passing in username and password//
		$scope.authenticate = function(username, password) {
			console.log('hit login ctrl')
			authSvc.authenticateUser(username, password);
		};

})
