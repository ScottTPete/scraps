angular.module('scrapsApp')
	.directive('navBar', function (userSvc) {
		return {
			restrict: 'E'
			, templateUrl: './directives/navbar/navTempl.html'
		}

	});