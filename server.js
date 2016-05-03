var express = require('express'),
	cors = require('cors'),
	bodyParser = require('body-parser'),
	session = require('express-session'),
	mongoose = require('mongoose'),
	User = require('./server/features/users/userModel'),
	app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(session({secret: 'secrets for the NSA', resave: true, saveUninitialized: false}));
app.use(express.static(__dirname + '/public'));


mongoose.connect('mongodb://localhost/scraps', function(err) {
	if(err) {
		console.log(err + ' bad things going down')
	} else {
		console.log('good to go')
	}
});

app.post('/api/users', function(req, res, next) {
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

app.get('/api/users', function (req, res, next) {
	User.find(req.query, function (err, response) {
		if (err) {
			res.status(500).send(err);
		} else {
			res.status(200).json(response);
		}
	})
})



//PORT//
var port = process.env.PORT || 8080;

app.listen(port, function () {
	console.log('Listening on port ' + port);
});
