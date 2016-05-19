angular.module('scrapsApp')
	.directive('searchUsers', function () {
		return {
			restrict: 'E'
			, templateUrl: './directives/search/searchTmpl.html'
			, link: function (scope, element, attrs) {

			}
		}

	});