var passport = require('passport'),
	User = require('./server/features/users/userModel'),
	app = require('./server/config/express.config')();

//Passport Local Auth//
require('./server/config/passport.local.config')(passport);

//Mongoose Setup//
require('./server/config/mongoose.config')();

//Startup Passport//
app.use(passport.initialize());
app.use(passport.session());

//Routes//
require('./server/features/auth/auth.server.routes')(app); //auth
require('./server/features/users/user.routes')(app); //user

//Middlewear//
var requireAuth = function(req, res, next) {
	if (!req.isAuthenticated()) {
		return res.status(403).end();
	}
	return next();
};

//Necessary to allow refresh/navigation in html5mode(true)//
app.all('*', function (req, res, next) {
	// Just send the index.html for other files to support HTML5Mode
	res.sendFile('./public/index.html', { root: __dirname });

});

//PORT//
var port = process.env.PORT || 8000;

app.listen(port, function () {
	console.log('Listening on port ' + port);
});
