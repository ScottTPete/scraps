var AWS = require('aws-sdk'),
	secret = require('../../config/s3.secrets'),
	User = require('../users/userModel');

AWS.config.update({
	accessKeyId: secret.AWSAccessKey,
	secretAccessKey: secret.AWSSecretKey,
	region: secret.AWSRegion
});

var s3 = new AWS.S3();

module.exports = {

	saveImage: function (req, res) {

		var buf = new Buffer(req.body.imageBody.replace(/^data:image\/\w+;base64,/, ''), 'base64'); //must convert base64 to Buffer so that amazon will accept the file

		var bucketName = secret.AWSBucket + req.body.userId

		var params = {
			Bucket: bucketName,
			Key: req.body.imageName,
			Body: buf,
			ContentType: 'image/' + req.body.imageExtension,
			ACL: 'public-read'
		}

		s3.upload(params, function (err, response) {
				console.log(response);
				if (err) {
					return res.status(500).send(err)
				}

				User.findById(req.body.userId, function (err, user) {
					console.log(user + ' s3 line 36');
					if (err) {
						return res.status(500).send(err)
					}
					user.profilePic = response.Location;

					user.save(function (err, updatedUser) {
						if (err) {
							console.log(err);
						}

						return res.status(200).send(updatedUser);


					})
				})

			})
	},

	/*deleteImage: function(req, res) {

	}*/
}
