angular.module('scrapsApp', ['ui.router', 'ngMaterial'])

	.run(function ($rootScope, $state, $stateParams) {
		$rootScope.$state = $state;
		$rootScope.$stateParams = $stateParams;
	})
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
					userInfo: function (userSvc, $stateParams) {
						return userSvc.getUserInfo($stateParams.username)
					}
				}
			})
			.state('accountSettings', {
				url: '/account/settings',
				templateUrl: 'features/settings/accountSettingsView.html',
				caseInsensitve: true,
				controller: 'settingsCtrl',
				resolve: {
					currentUser: function (authSvc, $state) {
						return authSvc.getCurrentUser().catch(function (err) {
							$state.go('login')
						})
					}
				}
			})

		//Gets rid of the hashtag in the url//
		$locationProvider.html5Mode(true);

	});
