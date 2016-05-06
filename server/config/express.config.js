var express = require('express'),
	bodyParser = require('body-parser'),
	cors = require('cors'),
	session = require('express-session');
//	path = require('path'),


module.exports = function() {

	var app = express();


	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: false }));

	app.use(cors());
	app.use(session({secret: 'Secrets for the NSA', resave: false, saveUninitialized: true}));

	app.use(express.static('./public'));


	return app;

};
