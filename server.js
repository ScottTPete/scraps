var express = require('./server/config/express.config'),
	passport = require('passport'),
	app = express();

//Passport Local Auth//
require('./server/config/passport.local');

//Run Express//
var app = express();

//Mongoose Setup//
require('./server/config/mongoose.config')

//Startup Passport//
app.use(passport.initialize());
app.use(passport.session());

//Routes//
require('./server/features/auth/auth.server.routes')(app, passport);

var requireAuth = function(req, res, next) {
	if (!req.isAuthenticated()) {
		return res.status(403).end();
	}
	return next();
}

//User Endpoints//
app.post('/api/v1/users', function(req, res, next) {
	User.create(req.body, function (err, response) {
		if (err) {
			console.log(err)
			res.status(500).send(err);
		} else {
			console.log('new user')
			res.status(200).json(response);
		}
	})
})

app.get('/api/v1/users', function (req, res, next) {
	User.find(req.query, function (err, response) {
		if (err) {
			res.status(500).send(err);
		} else {
			res.status(200).json(response);
		}
	})
});

/*app.get('/api/profile/username', function(req, res, next) {
	User.findOne()
})*/

/*app.get('/*', function(req, res) {
	res.sendFile(__dirname + '/public/index.html')
});*/

//PORT//
var port = process.env.PORT || 8080;

app.listen(port, function () {
	console.log('Listening on port ' + port);
});
