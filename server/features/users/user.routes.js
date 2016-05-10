var userCtrl = require('./user.server.ctrl');

module.exports = function(app) {

	app.route('/api/v1/users')
		.get(userCtrl.getUsers)
//		.post(userCtrl.createUser)

	app.route('/api/v1/user/:username')
		.put(userCtrl.editUser)
		.get(userCtrl.getUserByUsername)

}
