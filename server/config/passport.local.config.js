var LocalStrategy = require('passport-local').Strategy,
	User = require('../features/users/userModel');

   module.exports = function(passport) {
	   passport.use(new LocalStrategy(function(username, password, cb) {
		   User.findOne({username: username}, function(err, user) {
				if(err) { return cb(err); }

			    if(!user) { console.log('no user found with that username'); cb(null, false)}

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
			console.log(user + ' passport config serializeUser')
			cb(null, user.id);
		});

		passport.deserializeUser(function(id, cb) {
			User.findById(id, function (err, user) {
				console.log(id + ' passport config 32')
				if (err) {
					return cb(err);
				}
				cb(null, user);
			});
		});

   };

