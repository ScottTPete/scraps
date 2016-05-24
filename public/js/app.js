angular.module('scrapsApp', ['ui.router'/*, 'ngMaterial'*/])

.constant("$MD_THEME_CSS", "")

.run(function ($rootScope, $state, $stateParams) {
		$rootScope.$state = $state;
		$rootScope.$stateParams = $stateParams;
	})
	.config(function ($urlRouterProvider, $stateProvider, $locationProvider) {

		$urlRouterProvider.otherwise('/');

		$stateProvider
			.state('home', {
				url: '/'
				, templateUrl: 'features/home/homeView.html'
				, controller: 'homeCtrl'
				, resolve: {
					currentUser: function (authSvc, $state) {
						return authSvc.getCurrentUser().catch(function (err) {
							return null
						})
					}
					, photosForCollage: function (postSvc) {
						return postSvc.getPhotos().then(function (response) {
							console.log(response);
							return response;
						})
					}
				, }
			})
			.state('login', {
				url: '/login'
				, templateUrl: 'features/auth/loginView.html'
				, caseInsensitve: true
				, controller: 'authCtrl'
				, resolve: {
					currentUser: function (authSvc, $state) {
						return authSvc.getCurrentUser().catch(function (err) {
							return null
						})
					}
				}
			})
			.state('register', {
				url: '/register'
				, templateUrl: 'features/auth/registerView.html'
				, caseInsensitve: true
				, controller: 'authCtrl'
				, resolve: {
					currentUser: function (authSvc, $state) {
						return authSvc.getCurrentUser().catch(function (err) {
							return null
						})
					}
				}
			})
			.state('profile', {
				url: '/user/:username'
				, templateUrl: 'features/user/userProfileView.html'
				, controller: 'userCtrl'
				, caseInsensitve: true
				, resolve: {
					currentUser: function (authSvc, $state) {
						return authSvc.getCurrentUser().catch(function (err) {
							return null;
						})
					}
					, checkUserExists: function (userSvc, $stateParams, $state) {
						return userSvc.getUserInfo($stateParams.username).then(function (response) {
							if (!response) {
								$state.go('home')
							}
						})

					}
					, userInfo: function (userSvc, $stateParams) {
						return userSvc.getUserInfo($stateParams.username)
					}
				}
			})
			.state('accountSettings', {
				url: '/account/settings'
				, templateUrl: 'features/settings/accountSettingsView.html'
				, caseInsensitve: true
				, controller: 'settingsCtrl'
				, resolve: {
					currentUser: function (authSvc, $state) {
						return authSvc.getCurrentUser().then(function (response) {

							if (!response) {
								$state.go('login');
							}
							return response;
						})

					}
				}
			})
			.state('following', {
				url: '/following'
				, templateUrl: 'features/following/followingView.html'
				, controller: 'followingCtrl'
				, caseInsensitve: true
				, resolve: {
					currentUser: function (authSvc, $state) {
						return authSvc.getCurrentUser().then(function (response) {

							if (!response) {
								$state.go('login');
							}
							return response;
						})
					}
					, getFollowingPosts: function (followingSvc) {
						return followingSvc.getFollowingPosts();
					}
				}

			})

		//Gets rid of the hashtag in the url//
		$locationProvider.html5Mode(true);

	});
