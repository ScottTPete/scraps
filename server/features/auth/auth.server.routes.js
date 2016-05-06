var authCtrl = require('./auth.server.ctrl');

module.exports = function (app) {

	//Auth Endpoints//
	app.post('/auth/login', authCtrl.validateUserLogin);

	app.get('/auth/logout', authCtrl.logoutUser);

}
