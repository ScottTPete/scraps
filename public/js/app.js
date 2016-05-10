angular.module('scrapsApp', ['ui.router', 'ngMaterial'])
	.config(function($urlRouterProvider, $stateProvider, $locationProvider) {

	$urlRouterProvider.otherwise('/');

	$stateProvider
	.state('home', {
		url: '/',
		templateUrl: 'features/home/homeView.html'
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
		caseInsensitve: true
	})
	.state('accountSettings', {
		url: '/:username/settings',
		templateUrl: 'features/user/accountSettingsView.html',
		caseInsensitve: true
	})

	//Gets rid of the hashtag in the url//
	$locationProvider.html5Mode(true);

});

