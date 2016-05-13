var userCtrl = require('./user.server.ctrl');

module.exports = function(app) {

	app.route('/api/v1/users')
		.post(userCtrl.createUser)
		.get(userCtrl.getUsers)

	app.route('/api/v1/user/:id')
		.put(userCtrl.editUser)
		.delete(userCtrl.deleteUser)

}
