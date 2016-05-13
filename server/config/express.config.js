var secret = require('./secrets.config')
	express = require('express'),
	bodyParser = require('body-parser'),
	cors = require('cors'),
	cookieParser = require('cookie-parser'),
	morgan = require('morgan'),
	flash = require('connect-flash'),
	session = require('express-session');

module.exports = function() {

	var app = express();

	app.use(morgan('dev'));
	app.use(cookieParser());
	app.use(bodyParser.json({limit: '50mb'}));
	app.use(bodyParser.urlencoded({limit: '50mb', extended: true }));

	app.use(cors());
	app.use(session({secret: secret.sessionSecret, resave: false, saveUninitialized: false}));
	app.use(flash());

	app.use(function(err, req, res, next) {
		console.error(err.stack);
		res.status(500).send('Something broke!');
	});

	app.use(express.static('./public'));

	return app;

};
