var passport = require('passport'),
	session = require('express-session'),
	User = require('../users/userModel');

module.exports = {
	loginUser: function(req, res, next) {
		passport.authenticate('local-login', function(err, user) {
			console.log(user)
			if (err) {
				return next(err);
			}
			// Redirect if it fails
			if (!user) {
				return res.redirect('/login');
			}
			// Otherwise Login
			req.logIn(user, function(err) {
				if (err) {
					return next(err);
				}
				// Redirect if it succeeds
				return res.redirect('/' + user.username);
			});
		})(req, res, next);
	},
	logoutUser: function(req, res, next) {
		req.session.destroy(function (err) {
			req.logout();
			res.redirect('/');
		});
	},
	registerUser: function(req, res, next) {
		if(req.session.user) {
			req.session.destroy(function (err) {
				req.logout();
			});
		}
		console.log(req.body)
		passport.authenticate('local-signup', function(err, user) {
			console.log(user + ' auth server ctl 34')
			if (err) {
				return next(err);
			}
			// Redirect if it fails
			if (!user) {
				return res.redirect('/register');
			}
			// Otherwise Login
			req.logIn(user, function(err) {
				if (err) {
					return next(err);
				}
				console.log(req.session);
				// Redirect if it succeeds
				return res.redirect('/' + user.username);
			});
		})(req, res, next);

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


/*console.log(req.body)
		if(!req.body.username || !req.body.password) {
			res.status(400).json({message: 'Please fill out all required fields'})
		}

		User.create(req.body, function(err, response) {
			if(err) {
				res.status(400).json(err)
			} else {
				res.status(200).json(response)

			}
		})

		passport.authenticate('local-signup', function(err, user) {
			if (err) {
				return next(err)
			}
			req.logIn(user, function(err) {
				if (err) {
					return next(err);
				}
				// Redirect if it succeeds
				return res.redirect('/');
			})
		});*/
