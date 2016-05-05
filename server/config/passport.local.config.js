var LocalStrategy = require('passport-local').Strategy,
	User = require('../features/users/userModel');

module.exports = function(passport) {

	//Local Auth Strategy//
	passport.use(new LocalStrategy(function(username, password, cb) {
		console.log(username)
		/*try{*/
		User.findOne({username: username}, function(err, user) {
			console.log("---",user);
			console.log(err, 'err');
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
		/*}catch(error){
			console.log("Bad things happened")
			}*/
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
