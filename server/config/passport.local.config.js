var LocalStrategy = require('passport-local').Strategy,
	User = require('../features/users/userModel'),
	userCtrl = require('../features/users/user.server.ctrl');

module.exports = function (passport) {

	passport.use('local-login', new LocalStrategy(function (username, password, cb) {
		User.findOne({
			username: username
		}, function (err, user) {
			if (err) {
				return cb(err);
			}

			if (!user) {
				cb(null, false);
			}

			user.comparePassword(password, function (err, isMatch) {
				if (err) {
					return cb(err);
				}

				// Password did not match
				if (!isMatch) {
					return cb(null, false);
				}

				// Success
				return cb(null, user);
			});
		});
	}));

	passport.use('local-signup', new LocalStrategy({
		passReqToCallback: true,
	}, function (req, username, password, cb) {
		console.log(username + ' ' + password)
		console.log(req.body, ' passport config')

		process.nextTick(function () {
			User.findOne({
				username: username
			}, function (err, user) {
				if (err) {
					return cb(err);
				}

				if (user) {
					return cb(null, false);
				} else {
					var newUser = new User();
					newUser.username = req.body.username;
					newUser.password = req.body.password;

					newUser.save(function(err, response) {
						console.log(newUser)
						console.log(response);

						if (err) {
							throw err;
						}
						// Success
						return cb(null, newUser)

					})

				}

			});
		})
	}));

	passport.serializeUser(function (user, cb) {
		cb(null, user.id);
	});

	passport.deserializeUser(function (id, cb) {
		User.findById(id, function (err, user) {
			if (err) {
				return cb(err);
			}
			cb(null, user);
		});
	});
};
