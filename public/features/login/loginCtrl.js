angular.module('scrapsApp')
	.controller('loginCtrl', function($scope, authSvc) {


		//Call authSvc, authenticate user function passing in username and password//
		$scope.authenticate = function(user) {
			console.log('hit login function')
			authSvc.authenticateUser(user)
		}

})
