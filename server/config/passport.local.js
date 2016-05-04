var passport = require('passport'),
	LocalStrategy = require('passport-local').Strategy,
	User = require('../features/users/userModel');

module.exports = function(passport) {

	//Local Auth Strategy//
	passport.use(new LocalStrategy(function(username, password, cb) {
		User.findOne({username: username}, function(err, user) {
			if (err) {
				return cb(err);
			}
			if (!user) {
				return cb(null, false);
			}
			if (!user.comparePassword(password)) {
				return cb(null, false);
				console.log('wrong password');
			}
			return cb(null, user);
		})
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

};
