var passport = require('passport'),
	session = require('express-session'),
	User = require('../users/userModel');

module.exports = {

	loginUser: function (req, res, next) {
		passport.authenticate('local-login', function (err, user) {
			if (err) {
				return next(err);
			}

			// Redirect if it fails
			if (!user) {
				return res.redirect('/login');
			}

			// Otherwise Login
			req.logIn(user, function (err) {
				if (err) {
					return next(err);
				}

				// Redirect if it succeeds
				return res.redirect('/' + user.username);
			});
		})(req, res, next);
	},

	logoutUser: function (req, res, next) {
		req.session.destroy(function (err) {
			req.logout();
			res.redirect('/');
		});
	},

	registerUser: function (req, res, next) {

		if (req.session.user) {
			req.session.destroy(function (err) {
				req.logout();
			});
		}

		passport.authenticate('local-signup', function (err, user) {

			if (err) {
				return next(err);
			}
			// Redirect if it fails
			if (!user) {
				return res.redirect('/register');
			}
			// Otherwise Login
			req.logIn(user, function (err) {
				if (err) {
					return next(err);
				}

				// Redirect if it succeeds
				return res.redirect('/' + user.username);
			});
		})(req, res, next);

	},
	currentUser: function (req, res, next) {
		res.send(req.user)
	}


}
