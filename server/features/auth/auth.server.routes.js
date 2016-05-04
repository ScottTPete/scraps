module.exports = function (app, passport) {

	//Auth Endpoints//
	app.post('/auth/login', passport.authenticate('local', {
		failureRedirect: '/#/login'
	}),
			 function (req, res) {
		console.log(req)
		res.redirect('/')
	});

	app.get('/auth/logout', function(req, res){
		req.logout();
		res.redirect('/');
	});

}
