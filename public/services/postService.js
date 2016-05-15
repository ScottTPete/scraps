angular.module('scrapsApp')
	.service('postSvc', function ($http) {

		this.savePhoto = function (photo) {
			return $http.post('/api/v1/photo', photo);
		}

		this.editPhoto = function (photo) {
			return $http.put('/api/v1/photo/' + photo._id, photo)
		};

	})
