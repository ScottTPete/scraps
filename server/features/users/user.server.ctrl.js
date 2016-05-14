var User = require('./userModel');

module.exports = {

	createUser: function (req, res, next) {
		User.create(req.body, function (err, user) {
			if (err) {

				res.status(500).send(err);
			} else {

				res.status(200).send(user);
			}
		})
	},
	getUsers: function (req, res, next) {
		User.find(req.query, function (err, users) {
			if (err) {
				res.status(500).send(err);
			} else {
				res.status(200).send(users);
			}
		})
	},
	editUser: function (req, res, next) {
		User.findByIdAndUpdate(req.params.id, req.body, function (err, user) {
			if (err) {
				return res.status(500).send(err);
			} else {
				return res.status(200).send(user);
			}
		})
	},
	deleteUser: function(req, res, next) {
		User.findByIdAndRemove(req.params.id, function(err, response) {
			if(err) {
				return res.status(500).send(err);
			} else {
				return res.status(200).send(response);
			}
		})
	},
	/*addFriend: function(req, res, next) {

	},
	unFriend: function(req, res, next ){

	},
	followUser: function(req, res, next) {

	},
	unFollowUser: function(req, res, next) {

	}*/



}
