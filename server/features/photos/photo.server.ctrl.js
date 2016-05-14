var Photo = require('./photoSchema'),
	User = require('../users/userModel');

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
					if (err) {
						res.status(500).send(err)
					} else {
						res.status(200).send(user)
					}
				})
			}
		})
	},
	getPhotos: function (req, res, next) {
		Photo.find(req.query, function (err, photos) {
			if (err) {
				res.status(500).send(err);
			} else {
				res.status(200).send(photos);
			}
		})
	},
	editPhoto: function (req, res, next) {
		Photo.findByIdAndUpdate(req.params.id, req.body, function (err, photo) {
			if (err) {
				res.status(500).send(err);
			} else {
				res.status(200).send(photo);
			}
		})
	},
	deletePhoto: function (req, res, next) {
		Photo.findByIdAndRemove(req.params.id, function (err, photo) {
			console.log(photo);
			if (err) {
				res.status(500).send(err);
			} else {
				console.log(photo.postedBy);
				User.findByIdAndUpdate(photo.postedBy, {$pull: {'photos': photo._id}}, function(err, response) {
					if(err) {
						res.status(500).send(err);
					}
					res.status(200).send(response);
				});
			}
		})
	}

}
