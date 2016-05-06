var passport = require('passport'),
	session = require('express-session');

module.exports = {
	validateUserLogin: function(req, res, next) {

		passport.authenticate('local', function(err, user, info) {
			if (err) { return next(err); }
			// Redirect if it fails
			if (!user) { return res.redirect('/login'); }
			// Otherwise Login
			req.logIn(user, function(err) {
				if (err) { return next(err); }
				// Redirect if it succeeds
				return res.redirect('/');
			});
			console.log(req.session)
		})(req, res, next);
	},
	logoutUser: function(req, res, next) {
		console.log(res.cache)
		req.logout();
		req.session.destroy();
		res.redirect('/');
		console.log(req.session)
	}
}


////////////////////////////////////////////////////////////////////////
///////////// May have to Revert back to the following. ////////////////
////////////////////////////////////////////////////////////////////////

/*app.post('/auth/login', function(req, res, next) {
		passport.authenticate('local', function(err, user, info) {
			console.log(user + ' auth route line 6');
			if (err) { return next(err); }
			// Redirect if it fails
			if (!user) { return res.redirect('/login'); }
			// Otherwise Login
			req.logIn(user, function(err) {
				console.log(user.name.firstname + ' auth route line 11')
				if (err) { return next(err); }
				// Redirect if it succeeds
				return res.redirect('/');
			});
		})(req, res, next);
	});*/

/*app.get('/loginSuccess', function(req, res) {
		var redirectPath = '/';
		if(req.user) {
			redirectPath = '/'
		}
		res.status(200).json({user: req.user, redirectPath: redirectPath});
	});

	app.get('/loginFailure', function(req, res) {
		var	redirectPath = '/login'
		res.status(200).json({redirectPath: redirectPath});
	});*/
