angular.module('scrapsApp')
	.service('authSvc', function ($http, $state) {

		this.getCurrentUser = function () {
			return $http.get('/auth/currentUser').then(function (response) {
				return response.data
			})
		}

	})
