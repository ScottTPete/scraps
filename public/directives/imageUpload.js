angular.module('scrapsApp')
	.directive('fileread', function(imageSvc) {

		return {
			restrict: 'A',
			link: function(scope, elem, attrs) {
				elem.bind('change', function(changeEvent) {
					var reader = new FileReader();

					reader.onload = function(loadEvent) {
						var fileread = loadEvent.target.result;
						console.log(fileread);
						var tempArray = elem['context'].value.split('');
						var filename = tempArray[tempArray.length -1];


					}
					reader.readAsDataURL(changeEvent.target.files[0]);
				})
			}
		}

})
