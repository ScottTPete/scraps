angular.module('scrapsApp')
	.directive('profilePicUpload', function(imageUploadSvc, userSvc) {

		return {
			restrict: 'A',
			link: function(scope, elem, attrs) {
				elem.bind('change', function(changeEvent) {

					var reader = new FileReader();

					reader.onloadend = function(loadEvent) {

						var fileread = loadEvent.target.result;

						var tempArray = elem[0].value.split('\\');
						var filename = tempArray[tempArray.length -1];

						imageUploadSvc.storeImage(fileread, filename, scope.userInfo._id).then(function(response){

							scope.userInfo.profilePic = response.Location;

							userSvc.editProfile(scope.userInfo)

						}).catch(function(err) {
							console.log(err);
						});
					}

					reader.readAsDataURL(changeEvent.target.files[0]);
				});
			}
		}

})
