angular.module('scrapsApp')
	.directive('fileread', function(imageSvc, userSvc) {

		return {
			restrict: 'A',
			link: function(scope, elem, attrs) {
				elem.bind('change', function(changeEvent) {
					var reader = new FileReader();

					reader.onloadend = function(loadEvent) {
						var fileread = loadEvent.target.result;
						console.log(fileread);
						var tempArray = elem['context'].value.split('');
						var filename = tempArray[tempArray.length -1];

						imageSvc.storeImage(fileread, filename, scope.userProfile._id).then(function(response){
							scope.userProfile.image = response.data.location;

							userSvc.getUserInfo(scope.userProfile.username);


						}).catch(function(err) {
							console.log(err);
						});
					}

					reader.readAsDataURL(changeEvent.target.files[0]);
				});
			}
		}

})
