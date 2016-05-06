module.exports = function (app, passport) {

	//Auth Endpoints//
    app.post('/auth/login', function(req, res, next) {
	    passport.authenticate('local', function(err, user, info) {
			console.log(user + ' auth route line 6');
		    if (err) { return next(err); }
		    // Redirect if it fails
		    if (!user) { return res.redirect('/loginFailure'); }
		    req.logIn(user, function(err) {
				console.log(user.name.firstname + ' auth route line 11')
			    if (err) { return next(err); }
			    // Redirect if it succeeds
			    return res.redirect('/loginSuccess');
		    });
	    })(req, res, next);
    });

	app.get('/loginSuccess', function(req, res) {
		var redirectPath;
		if(req.user) {
			redirectPath = '/'
		}
		res.status(200).json({user: req.user, redirectPath: redirectPath});
	})

	app.get('/loginFailure', function(req, res) {

		var	redirectPath = '/login'

		res.status(200).json({redirectPath: redirectPath});
	})
}
