var express = require('express'),
	cors = require('cors'),
	bodyParser = require('body-parser'),
	session = require('express-session'),
	mongoose = require('mongoose'),
	User = require('./server/features/users/userModel'),
	passport = require('passport'),
	LocalStrategy = require('passport-local').Strategy,
	app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({secret: 'Secrets for the NSA', resave: false, saveUninitialized: false}));
app.use(express.static(__dirname + '/public'));
app.use(function(req, res) {
	res.sendfile(__dirname + '/public/index.html');
});

//Intialize Mongoose db//
mongoose.connect('mongodb://localhost/scraps', function(err) {
	if(err) {
		console.log(err + ' bad things going down')
	} else {
		console.log('good to go')
	}
});


//Local Auth//
passport.use(new LocalStrategy(function(username, password, cb) {
	User.find(username, function(err, user) {
		if (err) {
			return cb(err);
		}
		if (!user) {
			return cb(null, false);
		}
		if (user.password != password) {
			return cb(null, false);
		}
		return cb(null, user);
	})
}))

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

app.use(passport.initialize());
app.use(passport.session());

app.post('/login', passport.authenticate('local', {
	failureRedirect: '/login'
}),
		function (req, res) {
	res.redirect('/')
});

app.get('/logout', function(req, res){
	req.logout();
	res.redirect('/');
});

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



//PORT//
var port = process.env.PORT || 8080;

app.listen(port, function () {
	console.log('Listening on port ' + port);
});
