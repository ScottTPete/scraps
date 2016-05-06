var authCtrl = require('./auth.ctrl.server');

module.exports = function (app, passport) {

	//Auth Endpoints//
	app.post('/auth/login', authCtrl.validateUserLogin);

}
