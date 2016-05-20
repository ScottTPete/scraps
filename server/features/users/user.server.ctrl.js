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
	}
	, getUsers: function (req, res, next) {
		User.find(req.query, function (err, users) {
			if (err) {
				res.status(500).send(err);
			} else {
				res.status(200).send(users);
			}
		})
	}
	, editUser: function (req, res, next) {
		console.log(req.body);
		User.findByIdAndUpdate(req.params.id, req.body, function (err, user) {
			if (err) {
				console.log(err);
				return res.status(500).send(err);
			} else {
				return res.status(200).send(user);
			}
		})
	}
	, deleteUser: function (req, res, next) {
		User.findByIdAndRemove(req.params.id, function (err, response) {
			if (err) {
				return res.status(500).send(err);
			} else {
				return res.status(200).send(response);
			}
		})
	}
	, followUser: function (req, res, next) {
		console.log(req.body)
		var currentUser = req.body.currentUserId;
		var userToFollow = req.body.userToFollow;
		User.findByIdAndUpdate(currentUser, {
			$addToSet: {
				'following': userToFollow

			}
		}, function (err, user) {
			if (err) {
				res.status(500).send(err)
			} else {
				res.status(200).send(user)
			}
		})

		User.findByIdAndUpdate(userToFollow, {
			$addToSet: {
				'followers': currentUser

			}
		}, function (err, response) {
			if (err) {
				console.log(err);
			}
		})

	}
	, unFollowUser: function (req, res, next) {}


}
