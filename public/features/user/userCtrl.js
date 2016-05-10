angular.module('scrapsApp')
	.controller('userCtrl', function ($scope, user) {

		$scope.currentUser = user;

		console.log($scope.currentUser);


	})
