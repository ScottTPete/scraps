angular.module('scrapsApp', ['ui.router', 'ng-material'])
	.config(function($urlRouterProvider, $stateProvider, $locationProvider) {

		$stateProvider
			.state('home', {
				url: '/',
				templateUrl: 'features/home/homeView.html'
			})
			.state('login', {
				url: '/login',
				templateUrl: 'features/login/loginView.html'
			})
			.state('profile', {
				url: '/:username',
				templateUrl: '',
			})

		$urlRouterProvider.otherwise('/');

		//Gets rid of the hashtag in the url//
		$locationProvider.html5Mode(true);
});

