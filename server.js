var passport = require('passport'),
	app = require('./server/config/express.config')();

//Mongoose Config//
require('./server/config/mongoose.config')();

//Passport-Local Config//
require('./server/config/passport.local.config')(passport);

//Startup Passport//
app.use(passport.initialize());
app.use(passport.session());


//Routes//
require('./server/features/auth/auth.server.routes')(app); //auth
require('./server/features/users/user.routes')(app); //user

//Necessary to allow refresh/navigation in html5mode(true)//
app.all('*', function (req, res, next) {
	// Just send the index.html for other files to support HTML5Mode
	res.sendFile('./public/index.html', { root: __dirname });

});

//PORT//
var port = process.env.PORT || 3000;

app.listen(port, function () {
	console.log('Listening on port ' + port);
});
