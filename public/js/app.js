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
		templateUrl: 'features/login/loginView.html',
		controller: 'loginCtrl'
	})
	.state('register', {
		url: '/register',
		templateUrl: 'features/register/registerView.html'
	})
	.state('profile', {
		url: '/:username',
		templateUrl: 'features/user/profileView.html',
	})
	.state('accountSettings', {
		url: '/:username/settings',
		templateUrl: 'features/user/accountSettingsView.html'
	})

	//Gets rid of the hashtag in the url//
	$locationProvider.html5Mode(true);

});

