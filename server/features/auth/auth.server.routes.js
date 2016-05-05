var LocalStrategy = require('passport-local').Strategy;

module.exports = function (app, passport) {

	//Auth Endpoints//
	app.post('/auth/login', passport.authenticate('local', {
		failureRedirect: '/'
	}), function(req, res, next) {
		console.log(req, 'req')
		res.redirect('/');
	});

	app.get('/auth/logout', function(req, res){
		req.logout();
		res.redirect('/');
	});

}
