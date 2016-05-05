var User = require('./userModel');

module.exports = {

	createUser: function(req, res, next) {
		User.create(req.body, function (err, user) {
			if (err) {
				console.log(err)
				res.status(500).send(err);
			} else {
				console.log('new user')
				res.status(200).json(user);
			}
		})
	},
	getUserById: function(req, res, next) {
		User.findById(req.params.id, function(err, user) {
			if (err) {
				res.status(500).send(err);
			} else {
				res.status(200).json(response);
			}
		})
	},
	getUsers: function (req, res, next) {
		User.find(req.query, function (err, users) {
			if (err) {
				res.status(500).send(err);
			} else {
				res.status(200).json(users);
			}
		})
	},
	editUser: function(req, res, next) {
		User.findByIdAndUpdate(req.params.id, function(err, user) {
			if (err) {
				res.status(500).send(err);
			} else if(!user) {
				console.log('No user found with that id.')
			} else {
				res.status(200).json(response);
			}
		})
	}



}
