var express = require('express'),
	bodyParser = require('body-parser'),
//	cors = require('cors'),
	cookieParser = require('cookie-parser'),
	morgan = require('morgan'),
	flash = require('connect-flash'),

	session = require('express-session');

module.exports = function() {

	var app = express();

	app.use(morgan('dev'));
	app.use(cookieParser());
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: false }));

//	app.use(cors());
	app.use(session({secret: 'Secrets for the NSA', resave: false, saveUninitialized: false}));
	app.use(flash())

	app.use(express.static('./public'));

	return app;

};
