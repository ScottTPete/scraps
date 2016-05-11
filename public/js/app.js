angular.module('scrapsApp', ['ui.router', 'ngMaterial'])
	.config(function ($urlRouterProvider, $stateProvider, $locationProvider) {

		$urlRouterProvider.otherwise('/');

		$stateProvider
			.state('home', {
				url: '/',
				templateUrl: 'features/home/homeView.html',
				resolve: {
					currentUser: function (authSvc, $state) {
						return authSvc.getCurrentUser().catch(function (err) {
							return null
						})
					},
				}
			})
			.state('login', {
				url: '/login',
				templateUrl: 'features/auth/loginView.html',
				caseInsensitve: true
			})
			.state('register', {
				url: '/register',
				templateUrl: 'features/auth/registerView.html',
				caseInsensitve: true
			})
			.state('userProfile', {
				url: '/:username',
				templateUrl: 'features/user/profileView.html',
				controller: 'userCtrl',
				caseInsensitve: true,
				resolve: {
					currentUser: function (authSvc, $state) {
						return authSvc.getCurrentUser().catch(function (err) {
							return null
						})
					},
					checkUsernameExists: function (authSvc, $stateParams, $state) {
						return authSvc.checkUsernameExists($stateParams.username).catch(function (err) {
							$state.go('home')
						})
					},
					userInfo: function(userSvc, $stateParams) {
						return userSvc.getUserInfo($stateParams.username)
					}
				}
			})
			.state('accountSettings', {
				url: '/:username/settings',
				templateUrl: 'features/user/accountSettingsView.html',
				caseInsensitve: true,
				resolve: {
					currentUser: function (authSvc, $state) {
						return authSvc.getCurrentUser().catch(function (err) {
							$state.go('login')
						})
					},
					profile: function (authSvc, $stateParams, $state) {
						return authSvc.checkUsernameExists($stateParams.username).catch(function (err) {
							$state.go('home')
						})
					}
				}
			})

		//Gets rid of the hashtag in the url//
		$locationProvider.html5Mode(true);

	});
