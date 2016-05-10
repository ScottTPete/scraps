angular.module('scrapsApp', ['ui.router', 'ngMaterial'])
	.config(function ($urlRouterProvider, $stateProvider, $locationProvider) {

		$urlRouterProvider.otherwise('/');

		$stateProvider
			.state('home', {
				url: '/',
				templateUrl: 'features/home/homeView.html',
				resolve: {
					user: function (authSvc, $state) {
						return authSvc.getCurrentUser().catch(function (err) {
							return null
						})
					},
				}
			})
			.state('login', {
				url: '/login',
				templateUrl: 'features/auth/loginView.html',
				controller: 'authCtrl',
				caseInsensitve: true
			})
			.state('register', {
				url: '/register',
				templateUrl: 'features/auth/registerView.html',
				controller: 'authCtrl',
				caseInsensitve: true
			})
			.state('profile', {
				url: '/:username',
				templateUrl: 'features/user/profileView.html',
				caseInsensitve: true,
				resolve: {
					user: function (authSvc, $state) {
						return authSvc.getCurrentUser().catch(function (err) {
							return null
						})
					},
					profile: function (authSvc, $stateParams, $state) {
						return authSvc.checkUsernameExists($stateParams.username).catch(function (err) {
							$state.go('home')
						})
					}
				}
			})
			.state('accountSettings', {
				url: '/:username/settings',
				templateUrl: 'features/user/accountSettingsView.html',
				caseInsensitve: true,
				resolve: {
					user: function (authSvc, $state) {
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
