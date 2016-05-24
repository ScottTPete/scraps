angular.module('scrapsApp')
	.directive('photoCollage', function () {
		return {
			restrict: 'E'
			, templateUrl: './directives/photoCollage/photoCollageTmpl.html'
		}

	});
