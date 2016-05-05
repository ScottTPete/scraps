var LocalStrategy = require('passport-local').Strategy,
	User = require('../features/users/userModel');

module.exports = function(passport) {

	//Local Auth Strategy//
	passport.use(new LocalStrategy(function(username, password, done) {

		User.findOne({username: username}, function(err, user) {
			if (err) {
				console.log(err)
				return done(err);
			}
			if (!user) {
				return done(null, false, { message: 'Incorrect username.'});
			}
			if (!user.comparePassword(password)) {
				return done(null, false), { message: 'Incorrect password.'};
				console.log('wrong password');
			}
			return done(null, user);
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
