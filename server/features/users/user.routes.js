var userCtrl = require('./user.server.ctrl');

module.exports = function(app) {

	app.route('/api/v1/user')
		.post(userCtrl.createUser)

	app.route('/api/v1/users')
		.get(userCtrl.getUsers)

	app.route('/api/v1/user/:id')
		.put(userCtrl.editUser)
		.delete(userCtrl.deleteUser)

}
