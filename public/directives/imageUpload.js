angular.module('scrapsApp')
	.directive('fileread', function(imageSvc, userSvc) {

		return {
			restrict: 'A',
			link: function(scope, elem, attrs) {
				elem.bind('change', function(changeEvent) {
					var reader = new FileReader();

					reader.onloadend = function(loadEvent) {

						var fileread = loadEvent.target.result;

						var tempArray = elem[0].value.split('\\');
						var filename = tempArray[tempArray.length -1];

						console.log(scope.userInfo);
						console.log(elem, filename);

						imageSvc.storeImage(fileread, filename, scope.userInfo._id).then(function(response){
							console.log(response);
							scope.userInfo.profileImg = response.data.location;

							userSvc.getUserInfo(scope.userInfo.username);
							console.log(scope.userInfo);


						}).catch(function(err) {
							console.log(err);
						});
					}

					reader.readAsDataURL(changeEvent.target.files[0]);
				});
			}
		}

})
