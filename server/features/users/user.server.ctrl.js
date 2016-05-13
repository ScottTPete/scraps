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
	getUserById: function (req, res, next) {
		console.log('hi');
		User.find({_id: req.params.id}, function (err, user) {
			console.log(err);
			console.log(user);
			if (err) {
				console.log(err);
				return res.status(500).send(err);
			} else {
				return res.status(200).json(user);
			}
		})
	},
	getUsers: function (req, res, next) {
		User.find(req.query, function (err, users) {
			if (err) {
				res.status(500).json(err);
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
	},
	deleteUser: function(req, res, next) {
		User.findByIdAndRemove(req.params.id, function(err, response) {
			if(err) {
				return res.status(500).send(err);
			} else {
				return res.status(200).json(response);
			}
		})
	}



}
