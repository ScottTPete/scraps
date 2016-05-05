module.exports = function (app, passport) {

	//Auth Endpoints//
	app.post('/auth/login', passport.authenticate('local', {
		failureRedirect: '/#/login',
		successRedirect: '/'
	}));

}
