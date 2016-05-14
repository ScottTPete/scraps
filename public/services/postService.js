angular.module('scrapsApp')
	.service('postSvc', function($http) {

		this.savePhoto = function(photo) {
			return $http.post('/api/v1/photo', photo);
		}


})
