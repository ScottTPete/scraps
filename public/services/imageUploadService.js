angular.module('scrapsApp')
	.service('imageUploadSvc', function ($http) {

		this.storeImage = function (imageData, filename, userId) {
			var imageExtension = imageData.split(';')[0].split('/');
			imageExtension = imageExtension[imageExtension.length - 1];

			var newImage = {
				imageName: filename,
				imageBody: imageData,
				imageExtension: imageExtension,
				userId: userId,
			};

			return $http.post('/api/v1/uploadImg', newImage).then(function(response) {
				console.log(response);

				return response.data;
			})
		}







	})
