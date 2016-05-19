angular.module('scrapsApp')
	.directive('postPhoto', function (imageUploadSvc, postSvc, userSvc, $state) {

		return {
			restrict: 'A'
			, link: function (scope, elem, attrs) {
				elem.bind('change', function (changeEvent) {

					var reader = new FileReader();

					reader.onloadend = function (loadEvent) {

						var fileread = loadEvent.target.result;

						var tempArray = elem[0].value.split('\\');
						var filename = tempArray[tempArray.length - 1];

						imageUploadSvc.storeImage(fileread, filename, scope.userInfo._id).then(function (response) {



							scope.newPhoto.postedBy = scope.userInfo._id;
							scope.newPhoto.image = response.Location;

							var newPhoto = scope.newPhoto;
							var userPhotos = scope.userInfo.photos;

							postSvc.savePhoto(newPhoto);

							userPhotos.unshift(newPhoto);
							$state.go($state.current, {}, {
								reload: true
							});



						}).catch(function (err) {
							console.log(err);
						});
					}

					reader.readAsDataURL(changeEvent.target.files[0]);
				});
			}
		}

	})