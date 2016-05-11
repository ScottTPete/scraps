var LocalStrategy = require('passport-local').Strategy,
	User = require('../features/users/userModel');

module.exports = function (passport) {

	passport.use('local-login', new LocalStrategy({
		passReqToCallback: true,
	}, function (req, username, password, cb) {

		User.findOne({
			username: username
		}, function (err, user) {
			if (err) {
				return cb(err);
			}

			if (!user) {
				return cb(null, false);
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

					if(req.body.profileImg) {
						newUser.profileImg = req.body.profileImg
					}

					newUser.save(function(err) {

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
