angular.module('scrapsApp')
	.directive('searchResults', function (userSvc) {
		return {
			restrict: 'E'
			, templateUrl: './directives/search/searchTmpl.html'
			, link: function (scope, element, attrs) {

				scope.fullname = true;
				userSvc.getUsers().then(function (response) {
					response = response.splice(0, 5);

					scope.searchUsers = response;

					scope.searchUsers.forEach(function (user) {
						if (!user.name || !user.name.firstname) {
							scope.fullname = false;
						} else {
							scope.fullname = true;
						}
					})
				});

				var searchInput = angular.element(document.querySelector('.search-input'));

				searchInput.on('input', function () {
					var inputLength = searchInput.val().length
					console.log(inputLength)

					if (inputLength > 1) {
						scope.searchResults = true;
					} else {
						scope.searchResults = false;
					}
				})



			}
		}

	});