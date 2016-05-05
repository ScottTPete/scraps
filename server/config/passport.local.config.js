var passport = require('passport'),
	LocalStrategy = require('passport-local').Strategy,
	User = require('../features/users/userModel');

	//Local Auth Strategy//
	passport.use(new LocalStrategy(function(username, password, cb) {

		User.findOne({username: username}, function(err, user) {
			console.log(user.name.firstname + ' passport config line 10')
			if (err) {
				console.log(err)
				return cb(err);
			}
			if (!user) {
				return cb(null, false);
			}
			user.comparePassword(password, function(err, isMatch) {
				console.log(password + ' passport config line 19')
				console.log(isMatch + ' passport config line 20')
				if (err) { return cb(err); }

				// Password did not match
				if (!isMatch) { return cb(null, false); }

				// Success
				return cb(null, user);
			});
		});
	}));

	passport.serializeUser(function(user, cb) {
		cb(null, user.id);
	});

	passport.deserializeUser(function(id, cb) {
		User.findById(id, function (err, user) {
			if (err) {
				return cb(err);
			}
			cb(null, user);
		});
	});

	var authenticate = passport.authenticate('local', {
		successRedirect: '/',
		failureRedirect: '/login'
	});

	console.log(authenticate())

module.exports = authenticate;
