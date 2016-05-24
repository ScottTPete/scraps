angular.module('scrapsApp')
	.service('postSvc', function ($http) {

		this.savePhoto = function (photo) {
			return $http.post('/api/v1/photo', photo);
		};

		this.editPhoto = function (photo, photoId) {
			return $http.put('/api/v1/photo/' + photoId, photo)
		};

		this.deletePhoto = function (photoId) {
			$http.delete('/api/v1/photo/' + photoId)
		};

		this.likePhoto = function (photoId) {
			console.log(photoId);
			return $http.put('/api/v1/photo/' + photoId + '/likes');
		};

		this.unlikePhoto = function (photoId) {
			console.log(photoId)
			return $http.put('/api/v1/photo/' + photoId + '/unlike');
		};

		this.getPhotos = function () {
			return $http.get('/api/v1/photos').then(function (response) {
				console.log(response);
				var responsePhotos = response.data;


				var reverseArr = responsePhotos.reverse()

				var twelvePhotos = reverseArr.splice(0, 12);
				console.log(twelvePhotos);
				return twelvePhotos;
			})
		}

	})
