var Photo = require('./photoModel')
	, User = require('../users/userModel');

module.exports = {

	postPhoto: function (req, res, next) {
		Photo.create(req.body, function (err, response) {
			if (err) {
				res.status(500).send(err)
			} else {
				User.findByIdAndUpdate(req.body.postedBy, {
					$push: {
						'photos': response._id
					}
				}, function (err, user) {
					console.log(user);
					if (err) {
						res.status(500).send(err)
					} else {
						res.status(200).send(user)
					}
				})
			}
		})
	}
	, getPhotos: function (req, res, next) {
		Photo.find(req.query).populate({
			path: 'postedBy'
			, select: 'username _id'
		}).exec(function (err, photos) {
			if (err) {
				res.status(500).send(err);
			} else {
				res.status(200).send(photos);
			}
		})
	}
	, editPhoto: function (req, res, next) {
		Photo.findByIdAndUpdate(req.params.id, req.body, function (err, photo) {
			if (err) {
				res.status(500).send(err);
			} else {
				res.status(200).send(photo);
			}
		})
	}
	, deletePhoto: function (req, res, next) {
		Photo.findByIdAndRemove(req.params.id, function (err, photo) {
			console.log(photo);
			if (err) {
				res.status(500).send(err);
			} else {
				console.log(photo.postedBy);
				User.findByIdAndUpdate(photo.postedBy, {
					$pull: {
						'photos': photo._id
					}
				}, function (err, response) {
					if (err) {
						res.status(500).send(err);
					}
					res.status(200).send(response);
				});
			}
		})
	}
	, likePhoto: function (req, res, next) {
		console.log(req.user + 'server photo ctrl req.user');
		console.log(req.body + 'server photo ctrl req.body');

		var user = req.user._id;

		Photo.findByIdAndUpdate(req.params.id, {
				$addToSet: {
					'likes': user
				}
			},

			function (err, photo) {
				console.log(photo);
				if (err) {
					res.status(500).send(err);
				} else {
					res.status(200).send(photo);
				}
			})

		User.findByIdAndUpdate(user, {
			$addToSet: {
				'likes.photos': req.params.id
			}
		}, function (err, response) {
			if (err) {
				console.log(err);
			}
		})
	},

	unlikePhoto: function (req, res, next) {
		console.log(req.user);
		var user = req.user._id;


		Photo.findByIdAndUpdate(req.params.id, {
				$pull: {
					'likes': user
				}
			},

			function (err, photo) {
				if (err) {
					res.status(500).send(err);
				} else {
					res.status(200).send(photo);
				}
			})

		User.findByIdAndUpdate(user, {
			$pull: {
				'likes.photos': req.params.id
			}
		}, function (err, response) {
			if (err) {
				console.log(err);
			}
		})

	}

}
