angular.module('scrapsApp')
	.service('followingSvc', function ($http) {

		this.getFollowing = function () {
			return $http.get('/api/v1/following').then(function (response) {
				console.log(response)
					//				return response.data
			})

		}



	})
