var User = require('./userModel');

module.exports = {

	createUser: function (req, res, next) {
		User.create(req.body, function (err, user) {
			if (err) {

				res.status(500).send(err);
			} else {

				res.status(200).json(user);
			}
		})
	},
	getUserByUsername: function (req, res, next) {

		User.findOne({
			username: req.params.username
		}, function (err, user) {

			if (err) {
				res.status(500).send(err);
			}
			if (!user) {
				return res.status(500).send(err)
			}

			res.status(200).send(user);

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
	editUser: function (req, res, next) {
		User.findByIdAndUpdate(req.params.id, req.body, function (err, user) {
			if (err) {
				return res.status(500).send(err);
			} else {
				return res.status(200).json(user);
			}
		})
	}



}
