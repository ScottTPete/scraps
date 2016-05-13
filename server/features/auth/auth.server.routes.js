var authCtrl = require('./auth.server.ctrl');

module.exports = function (app) {

	app.post('/auth/login', authCtrl.loginUser);

	app.get('/auth/logout', authCtrl.logoutUser);

	app.post('/auth/registerUser', authCtrl.registerUser);

	app.get('/auth/currentUser', authCtrl.currentUser);


}
