var authCtrl = require('./auth.server.ctrl');

module.exports = function (app) {

	//Auth Endpoints//
	app.post('/auth/login', authCtrl.loginUser);

	app.get('/auth/logout', authCtrl.logoutUser);

	app.post('/auth/register', authCtrl.registerUser);

}
