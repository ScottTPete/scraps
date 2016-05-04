var express = require('express'),
	cors = require('cors'),
	bodyParser = require('body-parser'),
	session = require('express-session'),
	path = require('path'),
	passport = require('passport');

module.exports = function() {

	var app = express();

	app.use(express.static(path.join(__dirname + '/public')));

	app.use(cors());
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: false }));

	app.use(session({secret: 'Secrets for the NSA', resave: false, saveUninitialized: false}));

	return app;


}
